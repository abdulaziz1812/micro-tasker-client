import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import useCoin from "../hook/useCoin";
import useAuth from "../hook/useAuth";
import coin from "../assets/coin.gif";
import notification from "../assets/notfication.gif";

const Dashboard = () => {
  const { user: currentUser } = useAuth();
  const email = currentUser?.email;
  const { user, isLoading, error } = useCoin(email);

  const links = {
    Buyer: [
      { name: "Buyer Home", path: "/dashboard/buyer/home" },
      { name: "Add new Tasks", path: "/dashboard/buyer/add-task" },
      { name: "My Tasks", path: "/dashboard/buyer/my-tasks" },
      { name: "Purchase Coin", path: "/dashboard/buyer/purchase-coin" },
      { name: "Payment History", path: "/dashboard/buyer/payment-history" },
    ],
    Worker: [
      { name: "Worker Home", path: "/dashboard/worker/home" },
      { name: "Task List", path: "/dashboard/worker/task-list" },
      { name: "My Submissions", path: "/dashboard/worker/my-submissions" },
      { name: "Withdrawals", path: "/dashboard/worker/withdrawals" },
    ],
    Admin: [
      { name: "Admin Home", path: "/dashboard/admin/home" },
      { name: "Manage Users", path: "/dashboard/admin/manage-users" },
      { name: "Manage Tasks", path: "/dashboard/admin/manage-tasks" },
    ],
    Default: [{ name: "Home", path: "/" }],
  };

  const navigationLinks = links[user?.role] || links.Default;

  return (
    <div className="mx-auto w-10/12">
      <div className="flex justify-between items-center p-4">
        <Link to="/">
          <img className="w-28" src={logo} alt="" />
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <h3 className="text-lg font-medium">Available Coin:</h3>
            <span className="ml-2 text-lg font-bold">
              {isLoading ? "Loading..." : error ? "Error" : user?.coin || 0}
            </span>
            <img src={coin} alt="Coin" className="w-6 ml-2" />
          </div>
          <div className="flex flex-col text-right">
            <h3 className="text-lg">
              <strong>Role:</strong> {user?.role || "Loading..."}
            </h3>
            <h3 className="text-lg">
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
      <div className="flex mb-10 shadow-2xl rounded-2xl">
        <div className="min-h-screen bg-green-200 rounded-l-2xl w-1/6 p-4">
          <ul className="menu p-2 space-y-2 w-full ">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path} className="btn btn-success ">
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

          <Outlet></Outlet>
        
      </div>
      <footer className="bg-green-900 text-white py-6 mb-8">
        <div className="w-10/12 mx-auto flex justify-between items-center">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
          <div className="flex gap-6">
            <NavLink to="/terms" className=" hover:text-white">
              Terms of Service
            </NavLink>
            <NavLink to="/privacy" className=" hover:text-white">
              Privacy Policy
            </NavLink>
            <NavLink to="/contact" className=" hover:text-white">
              Contact Us
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
