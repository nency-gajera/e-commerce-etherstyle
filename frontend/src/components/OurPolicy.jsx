import React from 'react';
import { RefreshCw, ShieldCheck, Headset } from 'lucide-react';

const OurPolicy = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-10 sm:gap-4 text-center py-16 px-6 my-12 bg-gray-50 rounded-2xl text-gray-700 border border-gray-100">
            <div className="flex flex-col items-center">
                <RefreshCw size={36} className="text-gray-900 mb-3" />
                <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Easy Exchange Policy</p>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xs">We offer hassle free exchange policy within 7 days</p>
            </div>
            <div className="flex flex-col items-center">
                <ShieldCheck size={36} className="text-gray-900 mb-3" />
                <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">7 Days Return Policy</p>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xs">We provide 7 days free return policy for all items</p>
            </div>
            <div className="flex flex-col items-center">
                <Headset size={36} className="text-gray-900 mb-3" />
                <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Best Customer Support</p>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xs">We provide 24/7 dedicated customer support team</p>
            </div>
        </div>
    );
};

export default OurPolicy;
