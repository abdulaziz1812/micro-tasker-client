import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import update from "../../../assets/lotties/Update.json";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAuth from "../../../hook/useAuth";

const UpdateProfile = () => {
  const { user } = useAuth();
  const [error, setError] = useState({});
  const [dbUser, setDbUser] = useState(null);
  //   const navigate = useNavigate();
  //   const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosPublic.get(`/user/${user.email}`);
        setDbUser(res.data);
      } catch (err) {
        console.error("Error fetching user", err);
        setError({ fetch: "Failed to load user data" });
      }
    };
    if (user?.email) fetchUser();
  }, [user, axiosPublic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    // TO DO
    // const formData = new FormData(e.target);
    // const name = formData.get("name");
    // const imageFile = formData.get("photo");

    // try {
    //   let photoURL = dbUser?.photo || user.photoURL;

    //   if (imageFile && imageFile.size > 0) {
    //     const imageData = new FormData();
    //     imageData.append("image", imageFile);

    //     const res = await axiosPublic.post(image_hosting_api, imageData, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });
    //     photoURL = res.data.data.display_url;
    //   }

    //   // Update Firebase profile
    //   await updateUserProfile(name, photoURL);

    //   // Update MongoDB user data
    //   const updatedUserData = {
    //     name,
    //     photo: photoURL,
    //   };

    //   const updateRes = await axiosPublic.patch(`/user/${user.email}`, updatedUserData);

    //   if (updateRes.data.modifiedCount > 0) {
    //     Swal.fire({
    //       title: "Profile Updated!",
    //       text: "Your profile has been successfully updated.",
    //       icon: "success",
    //       draggable: true,
    //     });
    //     // Update local state to reflect changes immediately
    //     setDbUser({ ...dbUser, name, photo: photoURL });
    //   } else {
    //     Swal.fire({
    //       title: "No Changes",
    //       text: "No updates were made to your profile.",
    //       icon: "info",
    //       draggable: true,
    //     });
    //   }

    //   navigate(location.state?.from || "/dashboard");

    // } catch (err) {
    //   console.error("Update error:", err);
    //   setError({
    //     reg: err.message || "Failed to update profile. Please try again.",
    //   });
    // }
  };

  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Update Profile | Micro Tasker</title>
      </Helmet>
      <div className="hero min-h-screen bg-gray-100 pb-8">
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center py-8 text-gray-800">
            Update Your Profile
          </h1>
          <div className="hero-content flex-col gap-12 lg:flex-row items-center">
            <div className="w-full max-w-md">
              <Lottie animationData={update} />
            </div>

            {/*Form*/}
            <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl border border-gray-200">
              <form className="card-body pb-4" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="input input-bordered focus:ring-2 focus:ring-blue-500"
                    defaultValue={dbUser.name || user.displayName || ""}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Photo</span>
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    Current:{" "}
                    <a
                      href={dbUser.photo}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      View Photo
                    </a>{" "}
                    (Leave blank not to update)
                  </span>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-success w-full ">
                    Update Profile
                  </button>
                </div>

                {error.reg && (
                  <label className="label text-sm text-red-500">
                    {error.reg}
                  </label>
                )}
                {error.fetch && (
                  <label className="label text-sm text-red-500">
                    {error.fetch}
                  </label>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
