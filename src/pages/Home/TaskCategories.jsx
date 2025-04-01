import { motion } from "framer-motion";

const TaskCategories = () => {
  const categories = [
    { id: 1, name: "Data Entry", icon: "📝", description: "Simple typing and data organization tasks." },
    { id: 2, name: "Surveys", icon: "📊", description: "Share your opinions and get rewarded." },
    { id: 3, name: "Content Creation", icon: "✍️", description: "Write, edit, or design for clients." },
  ];

  return (
    <div className="bg-white py-12">
      <div className="w-10/12 mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Explore Task Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: category.id * 0.2 }}
              className="p-6 rounded-lg shadow-xl"
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