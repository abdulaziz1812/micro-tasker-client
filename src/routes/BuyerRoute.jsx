import { Navigate, useLocation } from "react-router-dom";
import useBuyer from "../hook/useBuyer";
import useAuth from "../hook/useAuth";
import Lottie from "lottie-react";
import loadingLottieData from "../assets/lotties/loading.json";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isBuyer, isBuyerLoading] = useBuyer();
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Lottie animationData={loadingLottieData} className="w-60 " />
      </div>
    );
  }

  if (user && isBuyer) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"} />;
};

export default BuyerRoute;
