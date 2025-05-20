import Banner from './Banner';
import Testimonial from './Testimonial';
import HowItWorks from './HowItWorks';
import Features from './Features';
import { Helmet } from 'react-helmet-async';
import BestWorkers from './BestWorkers';
import JoinSection from './JoinSection';
import TaskCategories from './TaskCategories';
import Community from './Community';
import FAQ from './FAQ';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MobileWallet from './Mobilewallet';

const Home = () => {

    AOS.init({
        duration: 2000,
        
        easing: "ease-in-out",
      }); 
    return (
        <div>
            <Helmet>
                <title>Home | Micro Tasker</title>
            </Helmet>
            <Banner></Banner>
            <BestWorkers></BestWorkers>
            
            <HowItWorks></HowItWorks>
            <Features></Features>
            <TaskCategories></TaskCategories>
            <Testimonial></Testimonial>
            <Community></Community>
            <JoinSection></JoinSection>
            <MobileWallet></MobileWallet>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;