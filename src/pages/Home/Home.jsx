import React from 'react';
import Banner from './Banner';
import Testimonial from './Testimonial';
import HowItWorks from './HowItWorks';
import Features from './Features';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Micro Tasker</title>
            </Helmet>
            <Banner></Banner>
            <Testimonial></Testimonial>
            <HowItWorks></HowItWorks>
            <Features></Features>
        </div>
    );
};

export default Home;