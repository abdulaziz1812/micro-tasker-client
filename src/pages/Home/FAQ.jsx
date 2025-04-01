import { motion } from "framer-motion";


const FAQ = () => {


  const faqs = [
    {
      question: "What is Micro Tasker?",
      answer:
        "Micro Tasker is a platform where buyers post small tasks and workers earn by completing them.",
    },
    {
      question: "How do I get paid?",
      answer:
        "You earn coins for completed tasks, which can be withdrawn securely to your preferred payment method.",
    },
    {
      question: "Who can join?",
      answer:
        "Anyone can join as a worker or buyer—students, freelancers, or businesses!",
    },
  ];


  return (
    <div className="bg-gray-50 py-12">
      <div className="w-10/12 mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div
                tabIndex={0}
                className="collapse collapse-plus bg-base-100 border-base-300 border"
              >
                <div className="collapse-title font-semibold">
                  {faq.question}
                </div>
                <div className="collapse-content text-sm">{faq.answer}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
