import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 pt-16 pb-8 mt-32 text-sm text-gray-600">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10">
                
                {/* Brand Info */}
                <div>
                    <span className="font-serif text-2xl font-bold text-gray-900">
                        ETHERSTYLE<span className="text-rose-600">.</span>
                    </span>
                    <p className="mt-4 text-gray-500 max-w-md leading-relaxed">
                        Etherstyle was crafted to inspire individuality and modern elegance through sustainable, premium clothing designed for every occasion.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <p className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">COMPANY</p>
                    <ul className="flex flex-col gap-2">
                        <li><Link to="/" className="hover:text-gray-900 transition">Home</Link></li>
                        <li><Link to="/about" className="hover:text-gray-900 transition">About us</Link></li>
                        <li><Link to="/collection" className="hover:text-gray-900 transition">Delivery & Returns</Link></li>
                        <li><Link to="/contact" className="hover:text-gray-900 transition">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <p className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2">
                        <li>+1-212-456-7890</li>
                        <li>contact@etherstyle.com</li>
                        <li>Instagram: @etherstyle_fashion</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
                <p> &copy; {new Date().getFullYear()} Etherstyle.com - All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
