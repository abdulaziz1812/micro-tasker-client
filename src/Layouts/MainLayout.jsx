import React from 'react';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';
import Home from '../pages/Home/Home';

const MainLayout = () => {
    return (
        <div >
            <Navbar ></Navbar>
            <Home></Home>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;