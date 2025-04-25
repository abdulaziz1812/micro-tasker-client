import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import auth from "../../firebase";
import useAxiosPublic from "../../hook/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = async (updatedData) => {
    setLoading(true);
    try {
      if (!auth.currentUser) {
        throw new Error("No authenticated user found");
      }
      // Validate inputs
      const { displayName, photoURL } = updatedData;
      if (displayName && typeof displayName !== "string") {
        throw new Error("Invalid displayName: Must be a string");
      }
      if (photoURL && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(photoURL)) {
        throw new Error("Invalid photoURL: Must be a valid image URL");
      }
      await updateProfile(auth.currentUser, updatedData);
      setUser({ ...auth.currentUser, ...updatedData });
      return auth.currentUser; // Return updated user
    } catch (err) {
      setLoading(false);
      throw err; // Propagate error to caller
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    logout,
    updateUserProfile,
    login,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;