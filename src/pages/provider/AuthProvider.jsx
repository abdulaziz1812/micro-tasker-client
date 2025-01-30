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

<<<<<<< HEAD
const googleProvider = new GoogleAuthProvider()
=======

>>>>>>> b0f9f31 (add new task added)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (updatedData) => {
    setLoading(true);
    updateProfile(auth.currentUser, updatedData);
    setUser({ ...auth.currentUser, ...updatedData });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      currentUser?.email;
      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axios
          .post(
            "https://service-review-system-server-beta.vercel.app/jwt",
            user,
            { withCredentials: true }
          )
          .then((res) => {
            res.data;
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://service-review-system-server-beta.vercel.app/logout",
            {},
            { withCredentials: true }
          )

          .then((res) => {
            "logout", res.data;
            setLoading(false);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  console.log(user);

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
