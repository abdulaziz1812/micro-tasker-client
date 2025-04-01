import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import banner01 from "../../assets/Banner/01.jpg";
import banner02 from "../../assets/Banner/2.jpg";
import banner03 from "../../assets/Banner/3.jpg";

const Banner = () => {
  
  const textAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const btnAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } },
    hover: { scale: 1.1, transition: { duration: 0.1 } },
  };

  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-[500px] md:h-[600px]">
            <img
              src={banner01}
              className="object-cover w-full h-full brightness-75" 
              alt="Empower Your Future"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-gray-900 via-transparent to-gray-900">
              <div className="text-center px-4 z-10">
                <motion.h1
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
                >
                  Empower Your Future
                </motion.h1>
                <motion.p
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl mx-auto"
                >
                  Join Micro Tasker to earn by completing simple tasks anytime, anywhere.
                </motion.p>
                <motion.div
                  variants={btnAnimation}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  className="mt-6"
                >
                  <Link
                    to="/register"
                    className="btn btn-success btn-lg rounded-full font-semibold  shadow-lg transition-all"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-[500px] md:h-[600px]">
            <img
              src={banner02}
              className="object-cover w-full h-full brightness-75"
              alt="Your Tasks, Your Earnings"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-900/70 via-transparent to-blue-900/50">
              <div className="text-center px-4 z-10">
                <motion.h1
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
                >
                  Your Tasks, Your Earnings
                </motion.h1>
                <motion.p
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl mx-auto"
                >
                  Post tasks as a buyer or earn rewards as a worker—flexibility at its best.
                </motion.p>
                <motion.div
                  variants={btnAnimation}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  className="mt-6"
                >
                  <Link
                    to="/dashboard"
                    className="btn btn-success btn-lg rounded-full font-semibold  shadow-lg transition-all"
                  >
                    Explore Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-[500px] md:h-[600px]">
            <img
              src={banner03}
              className="object-cover w-full h-full brightness-75"
              alt="Join the Best Workers"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-purple-900/70 via-transparent to-purple-900/30">
              <div className="text-center px-4 z-10">
                <motion.h1
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
                >
                  Join the Best Workers
                </motion.h1>
                <motion.p
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl mx-auto"
                >
                  Collaborate with top talent or become a skilled worker today.
                </motion.p>
                <motion.div
                  variants={btnAnimation}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  className="mt-6"
                >
                  <Link
                    to="/register"
                    className="btn btn-success btn-lg rounded-full font-semibold  shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;