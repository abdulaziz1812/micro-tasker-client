import { useEffect, useState } from "react";
import{motion} from "framer-motion"

const BestWorkers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/best-workers")
      .then((res) => res.json())
      .then((data) => setWorkers(data));
      console.log(workers);
  }, []);

  return (
    <div className="w-10/12 mx-auto p-6">
      <h2 className="font-bold text-center text-4xl py-6">Best Workers</h2>
      <div className="grid grid-cols-3 gap-6">
        {workers.map((worker, index) => (
          <motion.div 
          initial={{opacity:0}}
          whileInView={{opacity:1}}
          transition={{
              duration:.5 ,delay: index * .4 
          }} 
          key={index} className="p-4 mx-auto shadow-2xl rounded-2xl border border-gray-200 w-xs text-center">
            <img
              src={worker.photo}
              alt={worker.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h3 className="mt-2 text-lg font-semibold">{worker.name}</h3>
            <p className="text-gray-600">Coins: {worker.coin}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
