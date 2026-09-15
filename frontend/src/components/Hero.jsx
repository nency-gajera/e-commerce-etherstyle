import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="flex flex-col sm:flex-row border border-gray-300 rounded-lg overflow-hidden my-6 bg-white shadow-xs">
            
            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-16 px-6">
                <div className="text-[#414141] max-w-md">
                    <div className="flex items-center gap-2 mb-3">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className="font-semibold text-xs md:text-sm tracking-wider uppercase">OUR BESTSELLERS</p>
                    </div>

                    <h1 className="font-serif text-3xl sm:py-3 lg:text-5xl leading-relaxed font-normal text-gray-900">
                        Latest Arrivals
                    </h1>

                    <div className="flex items-center gap-2 mt-4">
                        <Link to="/collection" className="btn-primary">
                            SHOP NOW
                        </Link>
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141] ml-2"></p>
                    </div>
                </div>
            </div>

            {/* Hero Right Side Image */}
            <div className="w-full sm:w-1/2 relative min-h-[300px] sm:min-h-[420px]">
                <img 
                    src={assets.hero_img} 
                    alt="Hero Banner" 
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Hero;
