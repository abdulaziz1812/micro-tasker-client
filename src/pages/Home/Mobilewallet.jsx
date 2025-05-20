import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bkashLogo from "../../assets/wallets/bkash.jpg";
import rocketLogo from "../../assets/wallets/rocket.png";
import nagadLogo from "../../assets/wallets/nagad.png";

// Wallet data
const wallets = [
  {
    id: 1,
    name: "Bkash",
    logo: bkashLogo,
    description:
      "Instantly cash out your earnings with Bkash’s trusted platform.",
  },
  {
    id: 2,
    name: "Rocket",
    logo: rocketLogo,
    description: "Secure and fast withdrawals with Rocket, anytime, anywhere.",
  },
  {
    id: 3,
    name: "Nagad",
    logo: nagadLogo,
    description: "Get your earnings quickly with Nagad’s mobile wallet.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const MobileWallet = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20"
    >
      <div className="max-w-6xl w-11/12 mx-auto px-4 md:flex gap-8 justify-center items-center">
        {/* Text */}
        <motion.div
          variants={card}
          className="mb-12 text-center md:text-left md:w-1/2"
          data-aos="fade-right"
        >
          <h2
            id="wallet-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative"
          >
            Get Paid Your Way
            <span className="block w-20 h-1 bg-green-600 mt-2 mx-auto md:mx-0 rounded" />
          </h2>
          <p className="text-xl text-gray-700 font-medium mb-8 leading-relaxed">
            Withdraw your earnings instantly to your favorite mobile wallet with
            ease and security.
          </p>
          <Link to="/dashboard" className="btn btn-success rounded-full">
            Start Earning Now
          </Link>
        </motion.div>

        {/* Swiper */}
        <motion.div
          variants={card}
          className="w-full md:w-1/2"
          data-aos="fade-left"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            className="w-full rounded-lg bg-white shadow-xl hover:shadow-success/50 transition-shadow duration-300"
          >
            {wallets.map((wallet) => (
              <SwiperSlide key={wallet.id}>
                <motion.div
                  variants={card}
                  className="flex flex-col items-center p-6  m-2 hover:-translate-y-1 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.img
                    variants={card}
                    src={wallet.logo}
                    alt={`Logo of ${wallet.name} mobile wallet`}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {wallet.name}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center">
                    {wallet.description}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MobileWallet;
