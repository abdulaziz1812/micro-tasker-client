import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import john from "../../assets/Team/John.jpg"
import jane from "../../assets/Team/jane.jpg"
import david from "../../assets/Team/David.jpg"
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const members = (
    [
      { name: "John Smith", role: "Founder", img: john },
      { name: "Jane Doe", role: "Lead Developer", img: jane },
      { name: "David williams", role: "Community Manager", img: david },
    ]
  )

  const values =(
    [
      { title: "Flexibility", desc: "Work when and where you want." },
      { title: "Reliability", desc: "Trust in our secure platform." },
      { title: "Community", desc: "Join a supportive network." },
      { title: "Innovation", desc: "Pushing the boundaries of micro-tasking." },
    ]
  )

  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content text-center" data-aos="fade-down">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold my-4">
              About Micro Tasker
            </h1>
            <p className="text-lg md:text-xl">
              Connecting people with opportunities, one task at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            At Micro Tasker, we aim to empower individuals and businesses by
            creating a flexible, reliable platform for micro-tasks. Whether
            you’re earning extra income or outsourcing small jobs, we’re here
            to make it seamless.
          </p>
          <div className="stats shadow stats-vertical md:stats-horizontal">
            <div className="stat">
              <div className="stat-value text-success">1K+</div>
              <div className="stat-title">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-value text-success">5K+</div>
              <div className="stat-title">Tasks Completed</div>
            </div>
            <div className="stat">
              <div className="stat-value text-success">12+</div>
              <div className="stat-title">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-5xl mx-auto px-4" data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div
                key={index}
                className="card shadow-2xl bg-white flex justify-center items-center border  border-gray-200 group hover:shadow-success/50"
                data-aos="zoom-in"
                data-aos-delay={index * 400}
              >
                <div className="px-4 pt-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="rounded-full w-24 h-24 object-cover group-hover:scale-110"
                  />
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title text-xl font-semibold ">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-start gap-4"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="badge badge-success badge-lg p-4">
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
                  <h3 className="text-xl font-semibold text-gray-800">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join us */}
      <section className="py-16 ">
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-lg mb-8">
            Become part of the Micro Tasker community and start your journey today.
          </p>
          <Link to="/register" className="btn btn-success btn-lg">Get Started</Link >
        </div>
      </section>
    </div>
  );
};

export default AboutUs;