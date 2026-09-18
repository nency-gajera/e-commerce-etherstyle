import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, stock, inStock }) => {
    const { currency } = useContext(ShopContext);
    const isOutOfStock = stock !== undefined ? (stock <= 0 || inStock === false) : (inStock === false);

    return (
        <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer block group rounded-lg overflow-hidden bg-white border border-gray-100 shadow-xs hover:shadow-md transition duration-300 relative">
            <div className="relative overflow-hidden bg-gray-100 aspect-3/4">
                <img 
                    src={image && image[0] ? image[0] : 'https://picsum.photos/600/750'} 
                    alt={name} 
                    className={`w-full h-full object-cover group-hover:scale-105 transition ease-in-out duration-500 ${isOutOfStock ? 'opacity-70 grayscale' : ''}`}
                />
                {isOutOfStock && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow tracking-wide uppercase">
                        Out of Stock
                    </div>
                )}
            </div>
            <div className="pt-3 pb-2 px-2.5">
                <p className="text-sm font-medium text-gray-800 truncate mb-1">{name}</p>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900">{currency}{price}</p>
                    {isOutOfStock && (
                        <span className="text-[11px] font-medium text-red-500">Out of Stock</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
