import React from 'react';

import './Footer.css';

const Footer = () => {
    return (
        <div class="footer flex space-between gray-bg white-text light">
            <div class="footer-social flex center">
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-instagram"></i>
                <p>Onwards - Subway Management Website - SEF April 2024</p>
            </div>
            <div class="footer-text">
                <div class="footer-links flex center">
                    <span href="#">Careers</span>
                    <span href="#">About Us</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
