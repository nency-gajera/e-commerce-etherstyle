import React from 'react';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
    return (
        <div className="pt-10 border-t border-gray-200 animate-fade-in">
            <div className="text-center text-2xl pt-10">
                <h2 className="font-serif uppercase text-2xl sm:text-3xl text-gray-900">
                    CONTACT <span className="text-gray-500 font-normal">US</span>
                </h2>
            </div>

            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 items-center">
                <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80" 
                    alt="Contact Forever" 
                    className="w-full md:max-w-[450px] rounded-2xl object-cover shadow-sm" 
                />
                <div className="flex flex-col justify-center items-start gap-6 text-gray-600 text-sm">
                    <p className="font-bold text-lg text-gray-800">Our Store</p>
                    <p className="text-gray-500 leading-relaxed">
                        54709 Willms Station <br />
                        Suite 350, Washington, USA
                    </p>
                    <p className="text-gray-500 leading-relaxed">
                        Tel: (415) 555-0132 <br />
                        Email: admin@forever.com
                    </p>
                    
                    <p className="font-bold text-lg text-gray-800">Careers at Forever</p>
                    <p className="text-gray-500">Learn more about our teams and job openings.</p>
                    <button className="border border-black px-8 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-black hover:text-white transition cursor-pointer">
                        EXPLORE JOBS
                    </button>
                </div>
            </div>

            <NewsletterBox />
        </div>
    );
};

export default Contact;
