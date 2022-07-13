import React from "react";
import './app-header.scss';

export default function AppHeader() {
    return (
        <section className="main-header">
            <div>LOGO</div>
            <div className='navbar'>
                <div>Signup</div>
                <div>Map</div>
                <div>Profile</div>
            </div>
        </section>
    )
};