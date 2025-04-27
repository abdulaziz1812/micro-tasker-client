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
          <div className="flex flex-col gap-2 lg:flex-row h-[500px] md:h-[600px]">
            {/* Text */}
            <div className="w-full lg:w-1/3 flex items-center justify-start">
              <div className="text-left p-6 lg:px-16">
                <motion.h1
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  className="text-4xl lg:text-6xl font-extrabold text-black drop-shadow-lg"
                >
                  Empower Your Future
                </motion.h1>
                <motion.p
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-2xl text-black mt-4 max-w-2xl"
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
                    className="btn btn-success btn-lg rounded-full font-semibold shadow-lg transition-all"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </div>
            {/* Image */}
            <div className="w-full lg:w-2/3 lg:h-full md:h-[350px] relative px-6 md:px-8 lg:p-12">
              <img
                src={banner01}
                className="object-cover rounded-lg w-full h-full brightness-75 "
                alt="Empower Your Future"
              />
              <div className="absolute inset-x-6 md:inset-x-8 lg:inset-12 inset-y-0 bg-gradient-to-t from-green-950 via-transparent to-gray-950 rounded-lg"></div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex flex-col gap-2 lg:flex-row h-[500px] md:h-[600px]">
            {/* Text */}
            <div className="w-full lg:w-1/3 flex items-center justify-start">
              <div className="text-left p-6 lg:px-16">
                <motion.h1
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  className="text-4xl lg:text-6xl font-extrabold text-black drop-shadow-lg"
                >
                  Your Tasks, Your Earnings
                </motion.h1>
                <motion.p
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-2xl text-black mt-4 max-w-2xl"
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
                    className="btn btn-success btn-lg rounded-full font-semibold shadow-lg transition-all"
                  >
                    Explore Now
                  </Link>
                </motion.div>
              </div>
            </div>
            {/* Image */}
            <div className="w-full lg:w-2/3 h-full relative px-6 md:px-8 lg:p-12">
              <img
                src={banner02}
                className="object-cover rounded-lg w-full h-full brightness-75"
                alt="Your Tasks, Your Earnings"
              />
              <div className="absolute inset-x-6 md:inset-x-8 lg:inset-12 inset-y-0 bg-gradient-to-t from-green-950 via-transparent to-green-950 rounded-lg"></div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="flex flex-col gap-2 lg:flex-row h-[500px] md:h-[600px]">
            {/* Text */}
            <div className="w-full lg:w-1/3 flex items-center justify-start">
              <div className="text-left p-6 lg:px-16">
                <motion.h1
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  className="text-4xl lg:text-6xl font-extrabold text-black drop-shadow-lg"
                >
                  Join the Best Workers
                </motion.h1>
                <motion.p
                  variants={textAnimation}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-2xl text-black mt-4 max-w-2xl"
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
                    className="btn btn-success btn-lg rounded-full font-semibold shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            </div>
            {/* Image */}
            <div className="w-full lg:w-2/3 h-full relative px-6 md:px-8 lg:p-12">
              <img
                src={banner03}
                className="object-cover rounded-lg w-full h-full brightness-75"
                alt="Join the Best Workers"
              />
              <div className="absolute inset-x-6 md:inset-x-8 lg:inset-12 inset-y-0 bg-gradient-to-t from-green-950 via-transparent to-green-950 rounded-lg"></div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;