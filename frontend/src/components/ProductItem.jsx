import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer block group rounded-lg overflow-hidden bg-white border border-gray-100 shadow-xs hover:shadow-md transition duration-300">
            <div className="overflow-hidden bg-gray-100 aspect-3/4">
                <img 
                    src={image && image[0] ? image[0] : 'https://picsum.photos/600/750'} 
                    alt={name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition ease-in-out duration-500" 
                />
            </div>
            <div className="pt-3 pb-2 px-2.5">
                <p className="text-sm font-medium text-gray-800 truncate mb-1">{name}</p>
                <p className="text-sm font-bold text-gray-900">{currency}{price}</p>
            </div>
        </Link>
    );
};

export default ProductItem;
