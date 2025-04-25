import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import update from "../../../assets/lotties/Update.json";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [error, setError] = useState({});
  const [dbUser, setDbUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(`/user/${user.email}`);
        setDbUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
        setError({ fetch: "Failed to load user data. Please try again." });
      }
    };
    if (user?.email) fetchUser();
  }, [user, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const formData = new FormData(e.target);
    const name = formData.get("name")?.trim();
    const imageFile = formData.get("photo");

    if (!name) {
      setError({ reg: "Name is required" });
      return;
    }

    try {
      let photoURL = dbUser?.photo || user.photoURL;

      if (imageFile && imageFile.size > 0) {
        if (!["image/jpeg", "image/png"].includes(imageFile.type)) {
          setError({ reg: "Please upload a valid image (JPEG/PNG)" });
          return;
        }
        if (imageFile.size > 5 * 1024 * 1024) {
          setError({ reg: "Image size must be less than 5MB" });
          return;
        }
        const imageData = new FormData();
        imageData.append("image", imageFile);
        console.log("Uploading image to ImgBB...");
        const res = await axiosSecure.post(image_hosting_api, imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("ImgBB response:", res.data);
        if (!res.data.success) {
          throw new Error("Image upload failed");
        }
        photoURL = res.data.data.display_url;
      }

      // Prepare Firebase update
      const updatedData = {
        displayName: name,
        photoURL: photoURL || null, // Firebase allows null photoURL
      };
      console.log("Updating Firebase with:", updatedData);
      const originalName = user.displayName;
      const originalPhoto = user.photoURL;
      await updateUserProfile(updatedData);
      console.log("Firebase updated:", user.displayName, user.photoURL);

      // Update MongoDB
      const updatedUserData = { name, photo: photoURL };
      console.log("Sending MongoDB update:", updatedUserData);
      const updateRes = await axiosSecure.patch(`/user/profile/${user.email}`, updatedUserData);
      console.log("MongoDB update response:", updateRes.data);

      if (updateRes.data.matchedCount === 0) {
        // Roll back Firebase update
        await updateUserProfile({
          displayName: originalName,
          photoURL: originalPhoto,
        });
        throw new Error("User not found in database");
      }

      if (updateRes.data.modifiedCount > 0) {
        Swal.fire({
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
          icon: "success",
          draggable: true,
        });
        setDbUser({ ...dbUser, name, photo: photoURL });
      } else {
        Swal.fire({
          title: "No Changes",
          text: "No updates were made to your profile.",
          icon: "info",
          draggable: true,
        });
      }

      navigate(location.state?.from || "/dashboard");
    } catch (err) {
      console.error("Update error:", err.message, err.response?.data);
      const errorMessage = err.response?.data?.message || err.message || "Failed to update profile. Please try again.";
      Swal.fire({
        title: "Update Failed",
        text: errorMessage,
        icon: "error",
        draggable: true,
      });
      setError({ reg: errorMessage });
    }
  };

  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Update Profile | Micro Tasker</title>
      </Helmet>
      <div className="hero min-h-screen pb-8">
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center py-8 text-gray-800">
            Update Your Profile
          </h1>
          <div className="hero-content flex-col gap-12 lg:flex-row items-center">
            <div className="w-full max-w-md">
              <Lottie animationData={update} />
            </div>
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
                      href={dbUser.photo || user.photoURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Photo
                    </a>{" "}
                    (Leave blank to keep current)
                  </span>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-success w-full">Update Profile</button>
                </div>
                {error.reg && (
                  <label className="label text-sm text-red-500">{error.reg}</label>
                )}
                {error.fetch && (
                  <label className="label text-sm text-red-500">{error.fetch}</label>
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