import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginLottieData from "../assets/lotties/login.json";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SocialLogin from "./SocialLogin";
import useAuth from "../hook/useAuth";

const Login = () => {
  const { login, setUser } = useAuth();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.pathname || "/";

  // Refs to access input fields
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const { email, password } = initialData;

    login(email, password)
      .then((result) => {
        const user = result.user;
        if (user.uid) {
          Swal.fire({
            title: "Successfully Logged in",
            icon: "success",
            draggable: true,
          });
        }
        setUser(user);
        navigate(from);
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
      });
  };

  const handleAdminLogin = () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "admin@microtasker.com";
      passwordRef.current.value = "123456Az";
    }
  };

  const handleBuyerLogin = () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "buyer@microtasker.com";
      passwordRef.current.value = "123456Az";
    }
  };

  const handleWorkerLogin = () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "worker@microtasker.com";
      passwordRef.current.value = "123456Az";
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login | Micro Tasker</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div>
          <h1 className="text-5xl font-bold text-center py-8">Login now!</h1>
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div>
              <Lottie animationData={loginLottieData}></Lottie>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body pb-0" onSubmit={handleSubmit}>
                {/* Login Button */}
                <div className="flex gap-2">
                  <div className="form-control mt-4">
                    <button
                      type="button"
                      className="btn btn-sm btn-success p-5"
                      onClick={handleAdminLogin}
                    >
                      Login as Admin
                    </button>
                  </div>
                  <div className="form-control mt-4">
                    <button
                      type="button"
                      className="btn btn-sm btn-success p-5"
                      onClick={handleBuyerLogin}
                    >
                      Login as Buyer
                    </button>
                  </div>
                  <div className="form-control mt-4">
                    <button
                      type="button"
                      className="btn btn-sm btn-success p-5"
                      onClick={handleWorkerLogin}
                    >
                      Login as Worker
                    </button>
                  </div>
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
                    ref={emailRef}
                    required
                  />
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
                    ref={passwordRef}
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
                  <button className="btn btn-success w-full">
                    Login
                  </button>
                </div>

                {error.login && <p className="text-red-500">{error.login}</p>}
              </form>
              <div className="px-8 pb-8">
                <div className="divider text-[#737373]">OR</div>
                <SocialLogin></SocialLogin>
              </div>
              <p className="text-center font-semibold pb-9">
                <Link className="btn-link text-[#737373]" to="/register">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
