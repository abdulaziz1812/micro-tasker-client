import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-green-200 ">
      <div className="mx-auto w-10/12 ">
        <footer className="footer sm:footer-horizontal  p-10 text-black">
          <aside>
            <img src={logo} className="w-28" alt="" />
            <p className="text-gray-700">
              <strong>Micro Tasker</strong>
              <br />
              Connecting Opportunities, Empowering Earners.
            </p>
          </aside>
          <nav>
            <h6 className="footer-title font-bold">Quick Links</h6>
            <div className="grid grid-flow-row gap-4">
              <NavLink to="/about-us">
                About Us
              </NavLink>
              <NavLink to="/contact-us">
                Contact Us
              </NavLink>
              <NavLink to="/categories">
                Categories
              </NavLink>
              
              
            </div>
          </nav>
          <nav>
            <h6 className="footer-title font-bold">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <NavLink to="https://github.com/abdulaziz1812/">
                <FaGithub className="text-3xl" />
              </NavLink>
              <NavLink to="https://www.linkedin.com/in/abdul-aziz-abdul-mannan1/">
                <FaLinkedin className="text-3xl" />
              </NavLink>
              
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
