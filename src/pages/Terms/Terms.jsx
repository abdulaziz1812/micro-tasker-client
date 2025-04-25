import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  useEffect(() => {
    AOS.init({
      duration: 1800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero py-16">
        <div className="hero-content text-center" data-aos="fade-down">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold my-4">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Understand your rights and responsibilities when using Micro Tasker.
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
            Welcome to Micro Tasker
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            These Terms of Service ("Terms") govern your use of Micro Tasker, a
            platform connecting Buyers seeking task services with Workers providing
            those services. By accessing our website or app, you agree to these
            Terms. If you do not agree, please do not use our platform.
          </p>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16 bg-base-100">
        <div className="max-w-5xl mx-auto px-4" data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Our Terms
          </h2>
          <div className="space-y-8">
            {/* Eligibility */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Eligibility</h3>
              <p className="text-gray-600">
                You must be at least 18 years old and have the legal capacity to
                enter contracts to use Micro Tasker. Workers must provide accurate
                information about their skills, and Buyers must provide clear task
                descriptions.
              </p>
            </div>

            {/* User Accounts */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. User Accounts</h3>
              <p className="text-gray-600">
                You must create an account to access certain features. Keep your
                account credentials confidential and notify us at{" "}
                <a href="mailto:support@microtasker.com" className="text-blue-600 hover:underline">
                  support@microtasker.com
                </a>{" "}
                of any unauthorized use. We may suspend or terminate accounts for
                violating these Terms.
              </p>
            </div>

            {/* Use of Service */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="600">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Use of the Service</h3>
              <p className="text-gray-600">
                <strong>Buyers:</strong> Post tasks, review Worker profiles, and pay
                for completed tasks as agreed.
                <br />
                <strong>Workers:</strong> Perform them professionally,
                and submit deliverables as required.
                <br />
                <strong>Prohibited Actions:</strong> Do not post or perform illegal
                tasks, harass users, misuse personal information, violate
                intellectual property, or bypass our payment system.
              </p>
            </div>

            {/* Payments and Fees */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="800">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Payments and Fees</h3>
              <p className="text-gray-600">
                Buyers pay via our third-party processor (Stripe). Workers receive
                coins after task approval. Workers are responsible for applicable taxes. We may mediate
                payment disputes but are not obligated to resolve them.
              </p>
            </div>

            {/* Task Submissions */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1000">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">5. Task Submissions</h3>
              <p className="text-gray-600">
                Workers must submit deliverables as specified. Buyers must review
                submissions promptly and approve or reject them fairly, providing
                reasons for rejections. Micro Tasker may review disputes but is not
                required to resolve them.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">6. Intellectual Property</h3>
              <p className="text-gray-600">
                Micro Tasker’s content (e.g., logos, designs) is protected by
                intellectual property laws. You retain ownership of your content but
                grant us a non-exclusive, royalty-free license to use it for
                operating the platform.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1400">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">7. Limitation of Liability</h3>
              <p className="text-gray-600">
                Micro Tasker is not liable for indirect or consequential damages
                from using the platform. Our liability is limited to fees paid by
                you in the past 12 months. We do not guarantee task quality or user
                qualifications.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1600">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">8. Dispute Resolution</h3>
              <p className="text-gray-600">
                Disputes will be resolved through binding arbitration in [Your
                State/City] under American Arbitration Association rules. Contact us
                at{" "}
                <a href="mailto:support@microtasker.com" className="text-blue-600 hover:underline">
                  support@microtasker.com
                </a>{" "}
                for informal resolution first.
              </p>
            </div>

            {/* Termination */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="1800">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">9. Termination</h3>
              <p className="text-gray-600">
                We may suspend or terminate your access for violating these Terms.
                You may terminate your account by contacting us. Obligations like
                payment disputes survive termination.
              </p>
            </div>

            {/* Governing Law */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="2000">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">10. Governing Law</h3>
              <p className="text-gray-600">
                These Terms are governed by the laws of [Your State], USA. Legal
                actions not subject to arbitration must be filed in [Your
                State/City] courts.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="card shadow-2xl bg-white p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="2200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">11. Changes to Terms</h3>
              <p className="text-gray-600">
                We may update these Terms and will notify you via email or the
                platform. Continued use after changes constitutes acceptance.
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
            Reach out to us for any inquiries about these Terms or our platform.
          </p>
          <Link
            to="/contact-us"
            className="btn btn-success btn-lg"
          >
            Contact Support
          </Link>
        </div>
      </section>

      
    </div>
  );
};

export default Terms;