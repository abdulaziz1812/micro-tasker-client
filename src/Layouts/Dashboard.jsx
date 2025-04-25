import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import useCoin from "../hook/useCoin";
import useAuth from "../hook/useAuth";
import coin from "../assets/coin.gif";
import notification from "../assets/notification.gif";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { user: currentUser, logout } = useAuth();
  const email = currentUser?.email;
  const { user, isLoading, error } = useCoin(email);

  const link = (
    <>
      <li>
        <NavLink
          to="/"
          className="btn btn-sm btn-success  w-full text-center"
        >
          Home
        </NavLink>
      </li>
      <li>
        <button
          onClick={logout}
          className="btn btn-sm btn-success w-full text-center"
        >
          Logout
        </button>
      </li>
    </>
  );

  const links = {
    Buyer: [
      { name: "My Profile", path: "/dashboard/buyer/my-profile" },
      { name: "Buyer Home", path: "/dashboard/buyer/buyer-home" },
      { name: "Add new Tasks", path: "/dashboard/buyer/add-task" },
      { name: "My Tasks", path: "/dashboard/buyer/my-tasks" },
      { name: "Purchase Coin", path: "/dashboard/buyer/purchase-coin" },
      { name: "Payment History", path: "/dashboard/buyer/payment-history" },
    ],
    Worker: [
      { name: "My Profile", path: "/dashboard/worker/my-profile" },
      { name: "Worker Home", path: "/dashboard/worker/worker-home" },
      { name: "Task List", path: "/dashboard/worker/task-list" },
      { name: "My Submissions", path: "/dashboard/worker/my-submissions" },
      { name: "Withdrawals", path: "/dashboard/worker/withdrawals" },
    ],
    Admin: [
      { name: "My Profile", path: "/dashboard/admin/my-profile" },
      { name: "Admin Home", path: "/dashboard/admin/admin-home" },
      { name: "Manage Users", path: "/dashboard/admin/manage-users" },
      { name: "Manage Tasks", path: "/dashboard/admin/manage-tasks" },
    ],
    Default: [{ name: "Home", path: "/" }],
  };

  const navigationLinks = links[user?.role] || links.Default;

  return (
    <div className="">
      <Helmet>
        <title>Dashboard | Micro Tasker</title>
      </Helmet>
      <div className="navbar flex justify-between items-center sticky backdrop-blur top-0 z-10 px-10 ">
        <div className="navbar-start">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2"
            >
              {link}
            </ul>
          </div>

          <Link to="/" className="flex justify-center md:justify-start">
            <img className="w-16 md:w-28 hidden md:block" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex justify">
          <ul className="menu menu-horizontal px-1  gap-4">
            {link}
          </ul>
        </div>

        <div className="navbar-end flex  gap-6 items-center md:items-center md:gap-12">
          <div className="flex items-center">
            <h3 className="text-[8px] lg:text-base font-medium">Available Coin:</h3>
            <span className="text-[8px] ml-2 lg:text-base font-bold">
              {isLoading ? "Loading..." : error ? "Error" : user?.coin || 0}
            </span>
            <img src={coin} alt="Coin" className="w-6 ml-2 hidden md:block " />
          </div>

          <div className="flex md:flex-col text-right gap-1">
            <h3 className="text-[8px] lg:text-base">
              <strong>Role:</strong> {user?.role || "Loading..."}
            </h3>
            <h3 className="text-[8px] lg:text-base">
              <strong>Name:</strong> {user?.name || "Loading..."}
            </h3>
          </div>

          <div
            tabIndex={0}
            role="button"
            className="avatar tooltip tooltip-bottom"
            data-tip={currentUser?.displayName || "Profile"}
          >
            <div className="rounded-full w-6 h-6 md:h-12 md:w-12">
              <img
                alt="Profile"
                src={
                  currentUser?.photoURL ||
                  "https://img.icons8.com/?size=48&id=O9K5DaypaVKw&format=gif"
                }
              />
            </div>
          </div>

          {/* <div>
            <img
              src={notification}
              alt="Notification Icon"
              className="w-8 h-8"
            />
          </div> */}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row  overflow-hidden min-h-screen px-8 mt-4">
        {/* Sidebar */}
        <div className=" bg-green-200 my-4 ml-4 rounded-lg lg:w-fit p-4">
          <ul className="menu space-y-2 w-full">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
            `btn btn-xs btn-success text-center whitespace-nowrap hover:scale-105 ${isActive ? "font-extrabold text-green-900" : ""}`
                }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* side bar left side */}
        <div className=" m-4 w-full ">
          <Outlet />
        </div>
      </div>

      <footer className=" py-6">
        <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Micro Tasker. All rights reserved.</p>
          <div className="flex gap-6">
            <NavLink to="/terms" className="btn btn-sm btn-success" >
              Terms of Service
            </NavLink>
            <NavLink to="/privacy" className="btn btn-sm btn-success">
              Privacy Policy
            </NavLink>
            <NavLink to="/contact-us" className="btn btn-sm btn-success">
              Contact Us
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
