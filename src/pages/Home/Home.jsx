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

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Micro Tasker</title>
            </Helmet>
            <Banner></Banner>
            <BestWorkers></BestWorkers>
            <Testimonial></Testimonial>
            <HowItWorks></HowItWorks>
            <Features></Features>
            <TaskCategories></TaskCategories>
            <Community></Community>
            <JoinSection></JoinSection>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;