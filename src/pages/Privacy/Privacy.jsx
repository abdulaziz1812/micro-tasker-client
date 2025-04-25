import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  useEffect(() => {
    AOS.init({
      duration: 1800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className="hero py-16">
        <div className="hero-content text-center" data-aos="fade-down">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold my-4">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Learn how Micro Tasker protects your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: April 25, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Our Commitment to Your Privacy
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            At Micro Tasker, we value your trust and are committed to protecting
            your personal information. This Privacy Policy explains how we collect,
            use, share, and safeguard your data when you use our platform, website,
            or app to connect Buyers and Workers for micro-tasking services.
          </p>
        </div>
      </section>

      {/* Privacy Policy Sections */}
      <section className="py-16 bg-base-100">
        <div className="max-w-5xl mx-auto px-4" data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Privacy Policy Details
          </h2>
          <div className="space-y-8">
            {/* Information We Collect */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Information We Collect</h3>
              <p className="text-gray-600">
                We collect the following types of information:
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    payment details, and profile information (e.g., skills for Workers,
                    task preferences for Buyers) when you create an account or use
                    our services.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you interact
                    with our platform, such as tasks posted, bids submitted, and
                    pages visited.
                  </li>
                  <li>
                    <strong>Device Information:</strong> IP address, browser type,
                    and device details for security and analytics purposes.
                  </li>
                  <li>
                    <strong>Cookies:</strong> We use cookies to enhance your
                    experience (see Section 7).
                  </li>
                </ul>
              </p>
            </div>

            {/* How We Use Your Information */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. How We Use Your Information</h3>
              <p className="text-gray-600">
                We use your information to:
                <ul className="list-disc pl-6 mt-2">
                  <li>Provide and improve our platform, including matching Buyers
                    with Workers.</li>
                  <li>Process payments and distribute coins to Workers.</li>
                  <li>Communicate with you about tasks, account updates, or
                    promotions.</li>
                  <li>Analyze usage to enhance user experience and platform
                    functionality.</li>
                  <li>Prevent fraud and ensure compliance with our{" "}
                    <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>.
                  </li>
                </ul>
              </p>
            </div>

            {/* Sharing Your Information */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="600">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Sharing Your Information</h3>
              <p className="text-gray-600">
                We may share your information:
                <ul className="list-disc pl-6 mt-2">
                  <li>With Buyers or Workers to facilitate task completion (e.g.,
                    sharing Worker profiles with Buyers).</li>
                  <li>With service providers like Stripe for payment processing.</li>
                  <li>To comply with legal obligations or protect our rights.</li>
                  <li>With your consent, such as for marketing purposes.</li>
                </ul>
                We do not sell your personal information to third parties.
              </p>
            </div>

            {/* Data Security */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="800">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Data Security</h3>
              <p className="text-gray-600">
                We use industry-standard measures (e.g., encryption, secure servers)
                to protect your data. However, no system is completely secure, and
                we cannot guarantee absolute security. Notify us at{" "}
                <a href="mailto:support@microtasker.com" className="text-blue-600 hover:underline">
                  support@microtasker.com
                </a>{" "}
                if you suspect a security breach.
              </p>
            </div>

            {/* Your Rights */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1000">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">5. Your Rights</h3>
              <p className="text-gray-600">
                You have the right to:
                <ul className="list-disc pl-6 mt-2">
                  <li>Access, update, or delete your personal information via your
                    account settings.</li>
                  <li>Opt out of marketing communications.</li>
                  <li>Request a copy of your data by contacting us.</li>
                </ul>
                To exercise these rights, email{" "}
                <a href="mailto:support@microtasker.com" className="text-blue-600 hover:underline">
                  support@microtasker.com
                </a>.
              </p>
            </div>

            {/* Data Retention */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">6. Data Retention</h3>
              <p className="text-gray-600">
                We retain your personal information for as long as your account is
                active or as needed to provide services, comply with legal
                obligations, or resolve disputes. You may request deletion of your
                account, but some data (e.g., transaction records) may be retained
                as required by law.
              </p>
            </div>

            {/* Cookies and Tracking */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1400">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">7. Cookies and Tracking</h3>
              <p className="text-gray-600">
                We use cookies and similar technologies to:
                <ul className="list-disc pl-6 mt-2">
                  <li>Authenticate users and maintain sessions.</li>
                  <li>Analyze platform usage and improve functionality.</li>
                  <li>Deliver personalized content.</li>
                </ul>
                You can manage cookie preferences through your browser settings, but
                disabling cookies may affect platform functionality.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1600">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">8. Third-Party Links</h3>
              <p className="text-gray-600">
                Our platform may contain links to third-party websites (e.g.,
                payment processors). We are not responsible for their privacy
                practices. Review their policies before sharing information.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1800">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">9. Children's Privacy</h3>
              <p className="text-gray-600">
                Micro Tasker is not intended for users under 18. We do not knowingly
                collect personal information from children. If you believe a child
                has provided us with data, contact us at{" "}
                <a href="mailto:support@microtasker.com" className="text-blue-600 hover:underline">
                  support@microtasker.com
                </a>.
              </p>
            </div>

            {/* International Users */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="2000">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">10. International Users</h3>
              <p className="text-gray-600">
                Micro Tasker operates in [Your State], USA. If you access our
                platform from outside the USA, your data may be transferred to and
                processed in the USA, subject to our privacy practices.
              </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="2200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">11. Changes to This Privacy Policy</h3>
              <p className="text-gray-600">
                We may update this Privacy Policy and will notify you via email or
                the platform. Continued use after changes constitutes acceptance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Reach out to us for any inquiries about your privacy or our platform.
          </p>
          <Link to="/contact-us" className="btn btn-success btn-lg">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Privacy;