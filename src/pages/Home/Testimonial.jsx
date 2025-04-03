import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import photo01 from "../../assets/Testimonial/Alice.jpg";
import photo02 from "../../assets/Testimonial/mark.jpg";
import photo03 from "../../assets/Testimonial/sophia.jpg";
import photo04 from "../../assets/Testimonial/sofi.jpg";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Johnson",
    photo: photo01,
    quote:
      "Micro Tasker has been a game-changer for me. It's easy to use, and the earning opportunities are fantastic!",
  },
  {
    id: 2,
    name: "Mark",
    photo: photo02,
    quote:
      "I've been able to complete tasks at my convenience and earn coins effortlessly. Highly recommend!",
  },
  {
    id: 3,
    name: "Sophia",
    photo: photo03,
    quote:
      "A platform like this makes micro-tasking simple and enjoyable. Love the community too!",
  },
  {
    id: 4,
    name: "Sofi",
    photo: photo04,
    quote:
      "The tasks are straightforward, and the payout system is reliable. Great experience overall!",
  },
];

const Testimonial = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 "
    >
      <div className="max-w-5xl w-10/12 mx-auto px-4 md:flex gap-2 justify-center items-center">
       
        <div 
        data-aos="fade-right"
        className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 ">
          Echoes from Our Community
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
          True Stories Told by Micro Tasker Users
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          className="w-full max-w-3xl mx-auto shadow-2xl rounded-2xl border border-gray-200 bg-white hover:shadow-success/50 group"
          data-aos="fade-left"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col items-center p-8 md:p-10 text-center">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-6 border-4 border-green-100 object-cover group-hover:scale-110 "
                />
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg mx-auto italic">
                  "{testimonial.quote}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default Testimonial;