import React from "react";
import './app-header.scss';
import logo from '../../assets/img/logo.png';

export default function AppHeader() {
    return (
        <section className="main-header">
            <img className="logo" src={logo} alt="Logo" />
            <div className='navbar'>
                <div>Signup</div>
                <div>Map</div>
                <div>Profile</div>
            </div>
        </section>
    )
};