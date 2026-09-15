import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => item.bestseller);
            setBestSeller(bestProduct.length > 0 ? bestProduct.slice(0, 5) : products.slice(0, 5));
        }
    }, [products]);

    return (
        <div className="my-12">
            <div className="text-center text-3xl py-8">
                <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wider text-gray-900">
                    BEST <span className="text-gray-500 font-normal">SELLERS</span>
                </h2>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2 max-w-xl">
                    Discover our most popular signature pieces loved by customers worldwide.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
