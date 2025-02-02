import Banner from './Banner';
import Testimonial from './Testimonial';
import HowItWorks from './HowItWorks';
import Features from './Features';
import { Helmet } from 'react-helmet-async';
import BestWorkers from './BestWorkers';
import JoinSection from './JoinSection';

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
            <JoinSection></JoinSection>
        </div>
    );
};

export default Home;