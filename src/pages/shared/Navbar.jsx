import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
import useCoin from "../../hook/useCoin";
import useAuth from "../../hook/useAuth";
import coin from "../../assets/coin.gif";

const Navbar = () => {
  const { user: currentUser, logout } = useAuth();
  const email = currentUser?.email;
  // console.log(email);
  const { user, isLoading, error } = useCoin(email);
  // console.log(user);
  const authLink = (
    <>
      <li>
        <NavLink to="/dashboard" className="btn btn-success btn-sm">
          Dashboard
        </NavLink>
      </li>
      
        <div className="flex justify-center items-center gap-2 px-2">
          Available coin:{" "}
          {isLoading ? "Loading..." : error ? "Error" : user?.coin || 0}
          <img src={coin} alt="" className="w-5 rounded-full" />
        </div>
      
    </>
  );

  const links =(
    <>
    <li>
        <NavLink to="/" className={({ isActive }) =>
            `btn btn-sm btn-success ${isActive ? "font-extrabold" : ""}`
          }>
          Home
        </NavLink>
      </li>
    <li>
        <NavLink to="/about-us" className={({ isActive }) =>
            `btn btn-sm btn-success ${isActive ? "font-extrabold" : ""}`
          }>
          About Us
        </NavLink>
      </li>
    <li>
        <NavLink to="/contact-us" className={({ isActive }) =>
            `btn btn-sm btn-success ${isActive ? "font-extrabold" : ""}`
          }>
          Contact Us
        </NavLink>
      </li>
    <li>
        <NavLink to="/categories" className={({ isActive }) =>
            `btn btn-sm btn-success ${isActive ? "font-extrabold" : ""}`
          }>
          Categories
        </NavLink>
      </li>
    </>
  )
  return (
    <div className="bg-gray-200 ">
      <div className="w-11/12 mx-auto ">
        <div className="navbar  text-black">
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2"
              >
                {links}
                {currentUser && currentUser.email ? authLink : ""}
              </ul>
            </div>
            <Link to="/">
              <img className="w-16 lg:w-24" src={logo} alt="" />
              
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal  space-x-2">
              {links}
              {currentUser && currentUser.email ? authLink : ""}
            </ul>
          </div>
          <div className="navbar-end ">
            <div className="flex gap-1 justify-center items-center">
              {currentUser && currentUser.email ? (
                <>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
                    data-tip={currentUser?.displayName || "Profile"}
                  >
                    <div className=" rounded-full">
                      <img
                        alt="profile"
                        src={
                          currentUser?.photoURL ||
                          "https://img.icons8.com/?size=48&id=O9K5DaypaVKw&format=gif"
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="btn btn-xs md:btn-sm  btn-success"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-success btn-xs md:btn-sm">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-success btn-xs md:btn-sm"
                  >
                    Register
                  </Link>
                </>
              )}
              <a
                href="https://github.com/abdulaziz1812/micro-tasker-client"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-link text-xs text-gray-700"
              >
                Join as
                <br />
                Developer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
