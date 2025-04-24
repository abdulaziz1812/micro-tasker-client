import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const BestWorkers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
       
    
    fetch("https://micro-tasker-server.vercel.app/best-workers")
      .then((res) => res.json())
      .then((data) => setWorkers(data));
    // console.log(workers);
  }, []);

  return (
    <div className="w-11/12 mx-auto max-w-5xl p-6 min-h-60">
      
      <div className="mb-12 text-center " data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center ">
          Our Best Workers
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
          Exceptional Contributors Making a Difference
          </p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {workers.map((worker, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.4,
            }}
            key={index}
            className=" p-4 mx-auto shadow-2xl rounded-lg border border-gray-200 text-center w-full hover:shadow-success/50 group"
          >
            <img
              src={worker.photo}
              alt={worker.name}
              className="w-24 h-24 rounded-full mx-auto group-hover:scale-110"
            />
            <h3 className="mt-2 font-semibold">{worker.name}</h3>
            <p className="text-gray-600">Earned Coins: {worker.coin}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
