import React from "react";
import './app-header.scss';
import logo from '../../assets/img/logo.png';

const AppHeader = () => {
    return (
        <section className="main-header">
            <img className="logo" src={logo} alt="Logo" />
            <div className='navbar'>
                <div>Map</div>
                <div>Profile</div>
                <div>Signup</div>
            </div>
        </section>
    )
};

export default AppHeader;