import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-12 text-white">
      <div className="w-10/12 mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6"
        >
          Be Part of Our Growing Community
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          Connect with thousands of taskers and buyers worldwide. Share your skills, earn rewards, and grow together!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/register"
            className="btn btn-lg rounded-full "
          >
            Join the Community
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;