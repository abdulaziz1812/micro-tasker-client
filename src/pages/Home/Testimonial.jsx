import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-50 py-12"
    >
      <h2 className="text-4xl font-bold text-center mb-8">What People Say</h2>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop
        spaceBetween={30}
        slidesPerView={1}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-10/12 mx-auto shadow-2xl rounded-2xl"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl ">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
              <p className="text-gray-700 text-center">{testimonial.quote}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Testimonial;
