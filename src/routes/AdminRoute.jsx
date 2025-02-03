import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
import useAuth from "../hook/useAuth";
import Lottie from "lottie-react";
import loadingLottieData from "../assets/lotties/loading.json"


const AdminRoute = ({children}) => {
    const {user, loading} =useAuth()
    const [isAdmin,isAdminLoading] =useAdmin()
    const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Lottie animationData={loadingLottieData} className="w-60 "></Lottie>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default AdminRoute;