import { Link } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const Profile = () => {
  const { user } = useAuth();
  // console.log(user);

  // Function to format date
  const date = (addedDate) => {
    const newDate = new Date(addedDate);
    return newDate.toLocaleString("en-gb", {
      day: "2-digit",
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="min-h-screen mx-auto">
      <div className="mb-8">
        <div className="rounded-lg shadow-lg p-4 border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center  gap-10">
            {/* Profile Image Section */}
            <div className="relative flex-shrink-0 mt-4">
              <div className="w-72 h-72 overflow-hidden shadow-lg border-4 border-gray-200 rounded-tl-3xl rounded-br-3xl">
                <img
                  src={user.photoURL || "https://via.placeholder.com/288"}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/288";
                  }}
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#00bf83] text-white text-sm font-medium px-4 py-1 rounded-full shadow-md">
                Active
              </div>
            </div>

            
            <div className="flex-1  text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-1">
                Welcome Back,
              </h1>
              <div className="mb-6">
                <span className="text-4xl md:text-5xl font-extrabold text-green-900">
                  {user.displayName || "User"}
                </span>
                <span className="text-4xl md:text-5xl font-extrabold text-green-900">
                  !
                </span>
              </div>

              <div className=" rounded-xl p-6 shadow-md border border-gray-100 bg-green-200 w-full xl:w-8/12" >
                <ul className="space-y-4 text-gray-700 ">
                  <li className=" flex items-center gap-4 bg-white rounded-lg p-3 shadow-sm border border-gray-200 ">
                    <span className="w-23 text-sm font-semibold text-gray-600 bg-green-200 px-3 py-1 rounded-lg  ">
                      Name
                    </span>
                    <span className="flex-1 font-medium">
                      {user.displayName || "Not Provided"}
                    </span>
                  </li>
                  <li className="flex items-center gap-4 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <span className="w-23 text-sm font-semibold text-gray-600 bg-green-200 px-3 py-1 rounded-lg">
                      Email
                    </span>
                    <span className="flex-1 font-medium">
                      {user.email || "Not Provided"}
                    </span>
                  </li>
                  <li className="flex items-center gap-4 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <span className="w-23 text-sm font-semibold text-gray-600 bg-green-200 px-3 py-1 rounded-lg">
                      Joined
                    </span>
                    <span className="flex-1 font-medium">
                      {user.metadata.creationTime
                        ? date(user.metadata.creationTime)
                        : "Not Provided"}
                    </span>
                  </li>
                  <li className="flex items-center gap-4 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <span className="w-23 text-sm font-semibold text-gray-600 bg-green-200 px-3 py-1 rounded-lg">
                      Last Login
                    </span>
                    <span className="flex-1 font-medium">
                      {user.metadata.lastSignInTime
                        ? date(user.metadata.lastSignInTime)
                        : "Not Provided"}
                    </span>
                  </li>
                </ul>
              </div>

              <Link
                to="/dashboard/update-profile"
                className="mt-8 btn btn-success font-semibold rounded-xl shadow-md "
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;