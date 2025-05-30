import { useNavigate } from "react-router-dom";
import coin from "../../../assets/coin.gif";
import { Helmet } from "react-helmet-async";

const coinPackages = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

function PurchaseCoins() {
  const navigate = useNavigate();

  const handlePurchase = (packageInfo) => {
    navigate("/dashboard/buyer/checkout", { state: packageInfo });
  };

  return (
    <div className="p-6 m-10 rounded-2xl  shadow-2xl border border-gray-200">
      <Helmet>
        <title>Purchase Coin| Micro Tasker</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-green-800 mb-4">Purchase Coins</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coinPackages.map((pkg, index) => (
          <div
            key={index}
            className=" p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:bg-green-100 transition flex flex-col items-center justify-center "
            onClick={() => handlePurchase(pkg)}
          >
            <h3 className="text-xl font-semibold">{pkg.coins} Coins </h3>
            <img src={coin} alt="coin" className="w-20 rounded-full" />
            <p className="text-lg font-medium">${pkg.price}</p>
            <button className="btn btn-success mt-4">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseCoins;
