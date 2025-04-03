import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content text-center" data-aos="fade-down">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold my-4">
              Contact Micro Tasker
            </h1>
            <p className="text-lg md:text-xl">
              We’re here to help you connect, collaborate, and succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-base-100">
        <div className="max-w-5xl mx-auto px-4" data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Our Contact Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center hover:scale-105 " data-aos="fade-up" data-aos-delay="200">
              <div className="badge badge-lg badge-success p-4 mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-600">support@microtasker.com</p>
            </div>
            <div className="text-center hover:scale-105" data-aos="fade-up" data-aos-delay="400">
              <div className="badge badge-lg badge-success p-4 mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600">+88 0123456789</p>
            </div>
            <div className="text-center hover:scale-105" data-aos="fade-up" data-aos-delay="600">
              <div className="badge badge-lg badge-success p-4 mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Visit Us</h3>
              <p className="text-gray-600">123, Tech City, USA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact now */}
      <section className="py-16 ">
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have More Questions?
          </h2>
          <p className="text-lg mb-4">
            Reach out to us anytime—we’re excited to assist you!
          </p>
          <div className="text-2xl  font-bold  p-4">Contact Now!</div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;