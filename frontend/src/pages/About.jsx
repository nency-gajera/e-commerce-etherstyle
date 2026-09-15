import React from 'react';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
    return (
        <div className="pt-8 border-t border-gray-200 animate-fade-in">
            <div className="text-2xl text-center pt-8 border-t border-gray-100">
                <h2 className="font-serif uppercase text-2xl sm:text-3xl text-gray-900">
                    ABOUT <span className="text-gray-500 font-normal">US</span>
                </h2>
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-16 items-center">
                <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80" 
                    alt="About Forever" 
                    className="w-full md:max-w-[450px] rounded-2xl object-cover shadow-sm" 
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-sm sm:text-base leading-relaxed">
                    <p>Forever was born out of a passion for innovation and an unyielding desire to revolutionize the online fashion shopping experience. Our journey began with a simple idea: to provide a platform where customers can effortlessly discover, explore, and purchase top-tier apparel from the comfort of their homes.</p>
                    <p>Since our inception, we have worked tirelessly to curate a diverse selection of high-quality products that cater to every fashion preference. From timeless staples to trendsetting designs, our collections are crafted with precision and care.</p>
                    <b className="text-gray-800 text-lg font-serif">Our Mission</b>
                    <p>Our mission at Forever is to empower individuals through style, offering a seamless, secure, and delightful shopping journey backed by extraordinary customer care.</p>
                </div>
            </div>

            <div className="text-xl py-4 my-8">
                <div className="text-center text-xl sm:text-2xl mb-8">
                    <h3 className="font-serif uppercase text-gray-900">
                        WHY <span className="text-gray-500 font-normal">CHOOSE US</span>
                    </h3>
                </div>
                <div className="flex flex-col md:flex-row text-sm mb-20 gap-4">
                    <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-3 rounded-xl bg-white flex-1">
                        <b className="text-gray-900 font-bold">Quality Assurance:</b>
                        <p className="text-gray-500 text-xs sm:text-sm">We meticulously select and vet every product to ensure it meets our stringent quality standards.</p>
                    </div>
                    <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-3 rounded-xl bg-white flex-1">
                        <b className="text-gray-900 font-bold">Convenience:</b>
                        <p className="text-gray-500 text-xs sm:text-sm">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                    </div>
                    <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-3 rounded-xl bg-white flex-1">
                        <b className="text-gray-900 font-bold">Exceptional Support:</b>
                        <p className="text-gray-500 text-xs sm:text-sm">Our team of dedicated customer support specialists is available 24/7 to assist with any questions.</p>
                    </div>
                </div>
            </div>

            <NewsletterBox />
        </div>
    );
};

export default About;
