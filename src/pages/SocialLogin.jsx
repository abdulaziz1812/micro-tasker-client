import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import useAuth from "../hook/useAuth";
import { useState } from "react";
=======
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../hook/useAuth";
>>>>>>> b0f9f31 (add new task added)

const SocialLogin = () => {
  const { googleLogin, setUser } = useAuth();
  const navigate = useNavigate();
<<<<<<< HEAD
  const [error, setError] = useState();
  const from = location.state?.pathname || "/";

  const handelGoogleLogin = () => {
=======
  const [error, setError] = useState({});
  const [role, setRole] = useState(""); 
  const from = location.state?.pathname || "/";

  const handleGoogleLogin = () => {
    if (!role) {
      Swal.fire({
        icon: "warning",
        title: "Please select a role before logging in!",
      });
      return;
    }

>>>>>>> b0f9f31 (add new task added)
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
<<<<<<< HEAD
        navigate(from);
=======
        axios
          .get(`http://localhost:5000/user/${user.email}`)
          .then((res) => {
            const existingUser = res.data;

            if (!existingUser) {
              
              const coin = role === "Worker" ? 10 : 50;

              axios
                .post("http://localhost:5000/user", {
                  name: user.displayName,
                  email: user.email,
                  photo: user.photoURL,
                  role,
                  coin,
                })
                .then(() => {
                  Swal.fire({
                    icon: "success",
                    title: "Registration successful! Coins added.",
                  });
                  navigate(from);
                })
                .catch(() => {
                  setError({ google: "Failed to save user data in the database." });
                });
            } else {
             
              Swal.fire({
                icon: "success",
                title: "Login successful!",
              });
              navigate(from);
            }
          })
          .catch(() => {
            setError({ google: "Failed to check user existence." });
          });
>>>>>>> b0f9f31 (add new task added)
      })
      .catch((err) => {
        setError({ google: err.code });
      });
  };

  return (
    <div>
<<<<<<< HEAD
      <button
        onClick={handelGoogleLogin}
=======
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Select your role</span>
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select select-bordered"
        >
          <option value="" disabled>
            Select a Role
          </option>
          <option value="Worker">Worker</option>
          <option value="Buyer">Buyer</option>
        </select>
      </div>
      <button
        onClick={handleGoogleLogin}
>>>>>>> b0f9f31 (add new task added)
        className="btn bg-white text-black border-gray-400 w-full"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
<<<<<<< HEAD
      {error?.google && <p className="text-red-500">{error.google}</p>}
=======
      {error.google && <p className="text-red-500 mt-2">{error.google}</p>}
>>>>>>> b0f9f31 (add new task added)
    </div>
  );
};

export default SocialLogin;
