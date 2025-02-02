
import { useNavigate } from "react-router-dom";
import coin from "../../../assets/coin.gif"

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
    <div className="p-6 m-10 rounded-2xl w-full shadow-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-8">Purchase Coins</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coinPackages.map((pkg, index) => (
          <div
            key={index}
            className=" p-4 rounded-lg shadow-xl cursor-pointer hover:shadow-2xl hover:bg-gray-100 transition flex flex-col items-center justify-center "
            onClick={() => handlePurchase(pkg) }
          >
            <h3 className="text-xl font-semibold">{pkg.coins} Coins </h3>
            <img src={coin} alt="coin" className="w-20 rounded-full"/>
            <p className="text-lg font-medium">${pkg.price}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseCoins;
