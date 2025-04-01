import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import regLottieData from "../assets/lotties/reg.json";
import { Helmet } from "react-helmet-async";
import useAuth from "../hook/useAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxiosPublic from "../hook/useAxiosPublic";

const Register = () => {
  const { createUser, setUser, updateUserProfile } = useAuth();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const passwordValidation = (password) => {
    if (!/[A-Z]/.test(password)) {
      return "Password must include an uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must include a lowercase letter.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role");
    const password = formData.get("password");
    const imageFile = e.target.photo.files[0];

    const passwordError = passwordValidation(password);
    if (passwordError) {
      setError({ password: passwordError });
      return;
    }

    try {
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const res = await axiosPublic.post(image_hosting_api, imageData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const photo = res.data.data.display_url;
      const coin = role === "Worker" ? 10 : 50;

      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      setUser(user);

      await updateUserProfile({ displayName: name, photoURL: photo });

      await axios.post("https://micro-tasker-server.vercel.app/user", {
        name,
        email,
        photo,
        role,
        coin,
      });

      Swal.fire({
        title: "Registration successful!",
        icon: "success",
        draggable: true,
      });

      e.target.reset();
      navigate(location.state ? location.state : "/");
    } catch (err) {
      setError({ reg: err.message || "Registration failed!" });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Register | Micro Tasker</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen pb-8">
        <div>
          <h1 className="text-5xl font-bold text-center py-8">Register now!</h1>
          <div className="hero-content flex-col gap-10 lg:flex-row">
            {/* Registration Form */}
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body pb-0" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>
                  <input
                    type="file"
                    name="photo"
                    className="file-input"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select the role</span>
                  </label>
                  <select
                    name="role"
                    className="select select-success"
                    required
                  >
                    <option value="" disabled>
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
                    name="password"
                    placeholder="Password"
                    className="input input-bordered"
                    required
                  />
                  {error.password && (
                    <label className="label text-xs text-red-500">
                      {error.password}
                    </label>
                  )}
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-success w-full ">
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
                <SocialLogin />
              </div>
              <p className="text-center font-semibold pb-9">
                Already have an account?{" "}
                <Link className="text-red-500" to="/login">
                  Login
                </Link>
              </p>
            </div>

            <div>
              <Lottie animationData={regLottieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
