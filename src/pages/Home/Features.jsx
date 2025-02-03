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
    <div className="bg-gray-50 py-12 ">
      <div className="w-10/12 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto">
          {features.map((feature) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: feature.id * 0.4,
              }}
              key={feature.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
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
