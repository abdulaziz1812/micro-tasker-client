import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const categories = [
    {
      title: "Data Entry",
      desc: "Simple data input tasks to help businesses organize information.",
      icon: "📝",
    },
    {
      title: "Content Creation",
      desc: "Write reviews, blogs, or social media posts for creative projects.",
      icon: "✍️",
    },
    {
      title: "Surveys & Feedback",
      desc: "Share your opinions to shape products and services.",
      icon: "📊",
    },
    {
      title: "App Testing",
      desc: "Test new apps and provide feedback for developers.",
      icon: "📱",
    },
    {
      title: "Graphic Design",
      desc: "Create logos, banners, or small graphics for clients.",
      icon: "🎨",
    },
    {
      title: "Virtual Assistance",
      desc: "Support businesses with administrative tasks remotely.",
      icon: "💼",
    },
    {
      title: "Translation",
      desc: "Convert text between languages for global reach.",
      icon: "🌐",
    },
    {
      title: "Social Media Management",
      desc: "Schedule posts or engage with followers for brands.",
      icon: "📸",
    },
    {
      title: "Audio Transcription",
      desc: "Convert audio recordings into written text.",
      icon: "🎙️",
    },
    {
      title: "Product Research",
      desc: "Gather data on products or market trends.",
      icon: "🔍",
    },
    {
      title: "Photo Editing",
      desc: "Enhance or retouch images for various purposes.",
      icon: "🖼️",
    },
    {
      title: "Customer Support",
      desc: "Answer queries or assist users via chat or email.",
      icon: "📞",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="hero ">
        <div className="hero-content text-center" data-aos="fade-down">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold my-4">
              Explore Our Categories
            </h1>
            <p className="text-lg md:text-xl">
              Find the perfect tasks to match your skills and interests.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Task Categories
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Browse our diverse range of micro-task categories and start earning today!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="card shadow-2xl bg-white border border-gray-200 group  hover:shadow-success/50"
              data-aos="zoom-in"
              data-aos-delay={index * 400}
            >
              <div className="card-body text-center">
                <div className="text-5xl mb-4 group-hover:scale-110">{category.icon}</div>
                <h3 className="card-title text-xl font-semibold text-gray-800">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.desc}</p>
                <Link to="/dashboard" className="btn btn-outline btn-success mt-4">
                  Explore Tasks
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-5xl mx-auto px-4" data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Why Choose Our Categories?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Variety", desc: "Tasks for every skill level and interest." },
              { title: "Flexibility", desc: "Work on what suits your schedule." },
              { title: "Earnings", desc: "Get paid for every task you complete." },
              { title: "Growth", desc: "Build skills while you earn." },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="badge badge-lg badge-success p-4">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-16 ">
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Dive In?
          </h2>
          <p className="text-lg mb-8">
            Pick a category and start your micro-tasking journey today!
          </p>
          <Link to="/register" className="btn btn-success btn-lg">Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default Categories;