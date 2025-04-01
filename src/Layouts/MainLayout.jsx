import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div className="bg-[#f3f4f6] sticky backdrop-blur top-0 z-10 ">
      <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
