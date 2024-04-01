import React from 'react';

import './index.css';

const Navbar = ({ bg = 'no-bg' }) => {
    return (
        <section className={`navbar ${bg}`}>
            <nav className="nav-elements flex space-between light">
                <img className="logo" alt="logo" src="./images/Assets/logo.png" />
                <div>
                    <div className="nav-list flex center">
                        <button className="nav-link white-text no-bg">About Us</button>
                        <button className="nav-login white-text primary-bg box-shadow border-radius regular">
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
