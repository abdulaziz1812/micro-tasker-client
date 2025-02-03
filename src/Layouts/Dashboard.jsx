import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import useCoin from "../hook/useCoin";
import useAuth from "../hook/useAuth";
import coin from "../assets/coin.gif";
import notification from "../assets/notfication.gif";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { user: currentUser } = useAuth();
  const email = currentUser?.email;
  const { user, isLoading, error } = useCoin(email);

  const links = {
    Buyer: [
      { name: "Buyer Home", path: "/dashboard/buyer/buyer-home" },
      { name: "Add new Tasks", path: "/dashboard/buyer/add-task" },
      { name: "My Tasks", path: "/dashboard/buyer/my-tasks" },
      { name: "Purchase Coin", path: "/dashboard/buyer/purchase-coin" },
      { name: "Payment History", path: "/dashboard/buyer/payment-history" },
    ],
    Worker: [
      { name: "Worker Home", path: "/dashboard/worker/worker-home" },
      { name: "Task List", path: "/dashboard/worker/task-list" },
      { name: "My Submissions", path: "/dashboard/worker/my-submissions" },
      { name: "Withdrawals", path: "/dashboard/worker/withdrawals" },
    ],
    Admin: [
      { name: "Admin Home", path: "/dashboard/admin/admin-home" },
      { name: "Manage Users", path: "/dashboard/admin/manage-users" },
      { name: "Manage Tasks", path: "/dashboard/admin/manage-tasks" },
    ],
    Default: [{ name: "Home", path: "/" }],
  };

  const navigationLinks = links[user?.role] || links.Default;

  return (
    <div className="mx-auto w-11/12">
      <Helmet>
        <title>Dashboard | Micro Tasker</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-center md:p-4">
        <Link to="/" className="flex justify-center md:justify-start">
          <img className="w-16 md:w-28" src={logo} alt="Logo" />
        </Link>

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-center md:gap-12">
          <div className="flex items-center">
            <h3 className="text-xs lg:text-lg font-medium">Available Coin:</h3>
            <span className="text-xs ml-2 lg:text-lg font-bold">
              {isLoading ? "Loading..." : error ? "Error" : user?.coin || 0}
            </span>
            <img src={coin} alt="Coin" className="w-6 ml-2" />
          </div>

          <div className="flex flex-col text-right">
            <h3 className="text-xs lg:text-lg">
              <strong>Role:</strong> {user?.role || "Loading..."}
            </h3>
            <h3 className="text-xs lg:text-lg">
              <strong>Name:</strong> {user?.name || "Loading..."}
            </h3>
          </div>

          <div
            tabIndex={0}
            role="button"
            className="avatar tooltip tooltip-bottom"
            data-tip={currentUser?.displayName || "Profile"}
          >
            <div className="rounded-full w-12 h-12">
              <img
                alt="Profile"
                src={
                  currentUser?.photoURL ||
                  "https://img.icons8.com/?size=48&id=O9K5DaypaVKw&format=gif"
                }
              />
            </div>
          </div>

          <div>
            <img
              src={notification}
              alt="Notification Icon"
              className="w-8 h-8"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mb-10 shadow-2xl rounded-2xl overflow-hidden">
        {/* Sidebar */}
        <div className=" bg-green-200 rounded-t-2xl lg:rounded-l-2xl lg:w-fit p-4">
          <ul className="menu space-y-2 w-full">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className="btn btn-xs btn-success text-center whitespace-nowrap"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className=" p-4 w-full">
          <Outlet />
        </div>
      </div>

      <footer className="bg-green-900 text-white py-6">
        <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
          <div className="flex gap-6">
            <NavLink to="/terms" className="hover:text-white">
              Terms of Service
            </NavLink>
            <NavLink to="/privacy" className="hover:text-white">
              Privacy Policy
            </NavLink>
            <NavLink to="/contact" className="hover:text-white">
              Contact Us
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
