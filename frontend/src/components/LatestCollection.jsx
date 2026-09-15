import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);

    return (
        <div className="my-12">
            <div className="text-center py-8 text-3xl">
                <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wider text-gray-900">
                    LATEST <span className="text-gray-500 font-normal">COLLECTIONS</span>
                </h2>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2 max-w-xl">
                    Explore our newest premium arrivals curated for style, comfort, and timeless fashion.
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
