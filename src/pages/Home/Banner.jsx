import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 
import "swiper/css/pagination"; 
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules"; 
import { motion } from "framer-motion"; 
import banner01 from "../../assets/Banner/01.jpg";
import banner02 from "../../assets/Banner/2.jpg";
import banner03 from "../../assets/Banner/3.jpg";

const Banner = () => {
    
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-[400px]">
            <img
              src={banner01}
              className="object-cover w-full h-full"
              alt="Slide 1"
            />
            <div className="absolute inset-0 flex items-center justify-center">
    
              <div className="absolute inset-0 bg-black opacity-70"></div>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
                className="text-3xl font-bold text-white z-10"
              >
                Welcome to Micro Tasker
              </motion.h1>
            </div>
          </div>
        </SwiperSlide>

    
        <SwiperSlide>
          <div className="relative h-[400px]">
            <img
              src={banner02}
              className="object-cover w-full h-full"
              alt="Slide 2"
            />
            <div className="absolute inset-0 flex items-center justify-center">
           
              <div className="absolute inset-0 bg-black opacity-70"></div>
           
              <motion.h1
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="text-3xl font-bold text-white z-10"
              >
                Your Tasks, Your Earnings
              </motion.h1>
            </div>
          </div>
        </SwiperSlide>

     
        <SwiperSlide>
          <div className="relative h-[400px]">
            <img
              src={banner03}
              className="object-cover w-full h-full"
              alt="Slide 3"
            />
            <div className="absolute inset-0 flex items-center justify-center">
          
              <div className="absolute inset-0 bg-black opacity-70"></div>
        
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="text-3xl font-bold text-white z-10"
              >
                Join the Best Workers
              </motion.h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
