import React from 'react';

import './Footer.css';

const Footer = () => {
    return (
        <div className="footer flex gray-bg white-text light">
            <div className="footer-social flex center">
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <p>Onwards - Subway Management Website - SEF April 2024</p>
            </div>
            <div className="footer-text">
                <div className="footer-links flex center">
                    <span href="#">Careers</span>
                    <span href="#">About Us</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
