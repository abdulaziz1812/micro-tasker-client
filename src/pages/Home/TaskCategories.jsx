import { motion } from "framer-motion";

const TaskCategories = () => {
  const categories = [
    { id: 1, name: "Data Entry", icon: "📝", description: "Simple typing and data organization tasks." },
    { id: 2, name: "Surveys", icon: "📊", description: "Share your opinions and get rewarded." },
    { id: 3, name: "Content Creation", icon: "✍️", description: "Write, edit, or design etc. for clients." },
  ];

  return (
    <div className="bg-white py-12">
      <div className="w-10/12 mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Explore Task Categories</h2>
        <div className="flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: category.id * 0.2 }}
              className="p-6 rounded-lg shadow-2xl border border-gray-200 w-72 md:h-65 flex flex-col justify-center items-center"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCategories;