<<<<<<< HEAD
import React from 'react';
=======

>>>>>>> b0f9f31 (add new task added)
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div >
            <Navbar ></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;