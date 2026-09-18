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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238133.05964460803!2d72.82228589999998!3d21.159200149999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1774962009471!5m2!1sen!2sin" width="70%" height="400" loading="lazy"></iframe>
                <div className="flex flex-col justify-center items-start gap-6 text-gray-600 text-sm">
                    <p className="font-bold text-lg text-gray-800">Our Store</p>
                    <p className="text-gray-500 leading-relaxed">
                        54709 Willms Station <br />
                        Suite 350, Washington, USA
                    </p>
                    <p className="text-gray-500 leading-relaxed">
                        Tel: (415) 555-0132 <br />
                        Email: admin@etherstyle.com
                    </p>
                    
                    <p className="font-bold text-lg text-gray-800">Careers at Etherstyle</p>
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
