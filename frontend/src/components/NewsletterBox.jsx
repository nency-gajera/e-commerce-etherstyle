import React from 'react';
import { toast } from 'react-toastify';

const NewsletterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
        toast.success("Thank you for subscribing! Check your email for 20% off.");
    };

    return (
        <div className="text-center py-12 px-6 my-12 bg-zinc-900 text-white rounded-2xl shadow-md">
            <p className="text-2xl sm:text-3xl font-medium font-serif mb-2">
                Subscribe now & get 20% off
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto mb-6">
                Join our newsletter to receive exclusive offers, early access to new collections, and style tips.
            </p>

            <form onSubmit={onSubmitHandler} className="flex items-center justify-center max-w-md mx-auto w-full">
                <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    required 
                    className="w-full px-4 py-3 text-sm text-gray-900 bg-white rounded-l-md outline-none border-none placeholder-gray-500"
                />
                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-r-md transition cursor-pointer shrink-0">
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
};

export default NewsletterBox;
