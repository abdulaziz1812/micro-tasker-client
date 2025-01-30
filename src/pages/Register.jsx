import { useState } from "react";

import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import regLottieData from "../assets/lotties/reg.json";
import { Helmet } from "react-helmet-async";

import useAuth from "../hook/useAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";

const Register = () => {
  const { createUser, setUser, updateUserProfile } = useAuth();
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const passwordValidation = (password) => {
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const length = password.length >= 6;

    if (!upperCase) {
      return "Password must include an uppercase letter.";
    }
    if (!lowerCase) {
      return "Password must include a lowercase letter.";
    }
    if (!length) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setError({});
    const formData = new FormData(e.target);

    const initialData = Object.fromEntries(formData.entries());
    initialData;
    console.log(initialData);

    const { name, email, photo, role, password } = initialData;

    const coin = (role === "Worker" ? 10 : 50)

    const passwordError = passwordValidation(password);
    passwordError;
    if (passwordError) {
      setError({ password: passwordError });
      error;
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user ,role);
        
        setUser(user);
        if (result.user.uid) {
          axios
            .post("http://localhost:5000/user",
               { name, email, photo, role ,coin}
            )
            .then((result) => {
              
            })
            .catch((error) => {
              
            });

          Swal.fire({
            title: "Registration successful! ",
            icon: "success",
            draggable: true,
          });
          e.target.reset();
          navigate(location?.state ? location.state : "/");
          setError({});
        }
        result;
        updateUserProfile({ displayName: name, photoURL: photo })
          .then((res) => {})
          .catch((err) => {});
      })
      .catch((err) => {
        setError({ reg: err.code });
      });

    setError({});
  };

  return (
    <div>
      <Helmet>
        <title>Reg | Micro Tasker</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen pb-8">
        <div>
          <h1 className="text-5xl font-bold text-center py-8 ">
            Register now!
          </h1>
          <div className="hero-content flex-col gap-10 lg:flex-row">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
              <form className="card-body pb-0" onSubmit={handelSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    name="name"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">PhotoURL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="PhotoURL"
                    className="input input-bordered"
                    name="photo"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select the role</span>
                  </label>
                  <select
                    defaultValue=""
                    className="select select-success"
                    name="role"
                    required
                  >
<<<<<<< HEAD
                    <option disabled={true} className="text-[#8a8a8a]" selected>
=======
                    <option value="" disabled className="text-[#8a8a8a]" >
>>>>>>> b0f9f31 (add new task added)
                      Select a Role
                    </option>
                    <option>Worker</option>
                    <option>Buyer</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                {error.password && (
                  <label className="label text-xs text-red-500">
                    {error.password}
                  </label>
                )}
                <div className="form-control mt-6">
                  <button className="btn btn-success w-full text-white">
                    Register
                  </button>
                </div>
                {error.reg && (
                  <label className="label text-sm text-red-500">
                    {error.reg}
                  </label>
                )}
              </form>
              <div className="px-8 pb-8">
                <div className="divider">OR</div>
                <SocialLogin></SocialLogin>
              </div>
              <p className="text-center font-semibold pb-9">
                Already have an account ?{" "}
                <Link className="text-red-500" to="/login">
                  Login
                </Link>
              </p>
            </div>
            <div>
              <div className="">
                <Lottie animationData={regLottieData}></Lottie>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
