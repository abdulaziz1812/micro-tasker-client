import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const JoinSection = () => {
  return (
    <section className=" py-16  ">
      <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="container mx-auto max-w-5xl px-6 text-center">
        <div className="flex flex-col md:flex-row justify-center gap-8 ">
          {/* Worker Card */}
          <div className="card md:w-96 shadow-xl p-8 border border-gray-200 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800">Join as a Worker</h3>
            <p className="text-lg text-gray-600 mt-4">Start earning by completing microtasks for buyers!</p>
            <ul className="text-left mt-6 text-gray-600">
              <li className="mb-2">Work at your own pace</li>
              <li className="mb-2">Earn coins for every task</li>
              <li className="mb-2">Get paid securely</li>
            </ul>
            <Link to="/register" className="btn btn-success w-full mt-4">Start Earning</Link>
          </div>

          {/* Buyer Card */}
          <div className="card md:w-96 border border-gray-200 shadow-xl p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800">Join as a Buyer</h3>
            <p className="text-lg text-gray-600 mt-4">Post tasks and find skilled workers to complete them!</p>
            <ul className="text-left mt-6 text-gray-600">
              <li className="mb-2">Post your tasks with ease</li>
              <li className="mb-2">Find reliable workers quickly</li>
              <li className="mb-2">Track task progress in real-time</li>
            </ul>
            <Link  to="/register"className="btn btn-success w-full mt-4">Post a Task</Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default JoinSection;
