import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";

const Navbar = () => {
  const link = (
    <>
      <li>
        <NavLink to="/dashboard" className="">
          Dashboard
        </NavLink>
        </li>
        <li>
        <NavLink to="/dashboard" className="">
          Available coin
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-gray-200">
      <div className="w-11/12 mx-auto ">
        <div className="navbar  text-black">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {link}
              </ul>
            </div>
            <Link to="/">
              <img className="w-24" src={logo} alt="" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{link}</ul>
          </div>
          <div className="navbar-end ">
            <div className="flex gap-1 justify-center items-center">
              <Link to="/login" className="btn btn-success">
                Login{" "}
              </Link>
              <Link to="/register" className="btn btn-success">
                Register{" "}
              </Link>
              <Link to="/login" className="btn btn-success">
                User profile
              </Link>
              <Link to="/login" className="btn btn-success">
                Logout
              </Link>
              <Link
                to="https://github"
                className="btn btn-link text-xs text-gray-700"
              >
                Join as
                <br />
                Developer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
