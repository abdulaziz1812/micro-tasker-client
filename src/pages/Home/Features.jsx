import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Flexible Work",
      icon: "🕒",
      description: "Work on your own time and pace.",
    },
    {
      id: 2,
      title: "Secure Payments",
      icon: "💳",
      description: "Guaranteed payouts for completed tasks.",
    },
    {
      id: 3,
      title: "Global Community",
      icon: "🌎",
      description: "Join a network of taskers worldwide.",
    },
  ];

  return (
    <div className="py-12 ">
      <div className="w-10/12 mx-auto max-w-5xl">
        
        <div className="mb-12 text-center " data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center ">
          Why Choose Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
          The Benefits of Tasking with Us
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-8 ">
          {features.map((feature) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: feature.id * 0.4,
              }}
              key={feature.id}
              className="bg-white shadow-2xl rounded-lg p-6 flex flex-col items-center justify-center border w-72 md:h-65 border-gray-200 text-center hover:shadow-success/50 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 ">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
