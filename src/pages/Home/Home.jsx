import React from 'react';
import Banner from './Banner';
import Testimonial from './Testimonial';
import HowItWorks from './HowItWorks';
import Features from './Features';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Testimonial></Testimonial>
            <HowItWorks></HowItWorks>
            <Features></Features>
        </div>
    );
};

export default Home;