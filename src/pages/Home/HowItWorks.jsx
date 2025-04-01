import Lottie from "lottie-react";
import account from "../../assets/HowItWorks/CreatAcc.json"
import task from "../../assets/HowItWorks/task.json"
import coin from "../../assets/HowItWorks/coin.json"
import{motion} from "framer-motion"

const HowItWorks = () => {
    const steps = [
      { id: 1, title: "Create an Account", description: "Sign up and join our community to start earning.", lottie : account },
      { id: 2, title: "Pick a Task", description: "Browse through available tasks and choose one to complete.", lottie : task },
      { id: 3, title: "Earn Coins", description: "Complete tasks, earn coins, and cash out rewards.", lottie : coin  },
    ];
  
    return (
      <div className="-100 py-12">
        <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-8">
          {steps.map((step) => (
        
            <motion.div 
            initial={{opacity:0}}
            whileInView={{opacity:1}}
            transition={{
                duration:.5 ,delay: step.id * .4 
            }} 
            key={step.id} className="bg-white shadow-lg rounded-lg p-6 text-center w-72">
                <Lottie animationData={step.lottie}></Lottie>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HowItWorks;
  