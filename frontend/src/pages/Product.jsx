import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
                return null;
            }
        });
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    return productData ? (
        <div className="border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/* Product Details Section */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    {/* Multi-Thumbnail List */}
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.image.map((item, index) => (
                            <img 
                                onClick={() => setImage(item)} 
                                src={item} 
                                key={index} 
                                alt="Thumbnail" 
                                className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer object-cover aspect-3/4 rounded-md border ${image === item ? 'border-rose-600 ring-2 ring-rose-200' : 'border-gray-200'}`} 
                            />
                        ))}
                    </div>
                    {/* Main Image Preview */}
                    <div className="w-full sm:w-[80%] bg-gray-100 rounded-lg overflow-hidden max-h-[500px]">
                        <img src={image} alt={productData.name} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Product Info & Size Selection */}
                <div className="flex-1">
                    <h1 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 mt-2">
                        {productData.name}
                    </h1>
                    
                    {/* Ratings */}
                    <div className="flex items-center gap-1 mt-2 text-amber-500">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <p className="pl-2 text-gray-500 text-xs">(122 reviews)</p>
                    </div>

                    {/* Price */}
                    <p className="mt-5 text-3xl font-bold text-gray-900">
                        {currency}{productData.price}
                    </p>

                    {/* Description */}
                    <p className="mt-5 text-gray-600 text-sm leading-relaxed max-w-xl">
                        {productData.description}
                    </p>

                    {/* Select Size */}
                    <div className="flex flex-col gap-4 my-8">
                        <p className="font-semibold text-xs uppercase tracking-wider text-gray-800">Select Size</p>
                        <div className="flex gap-2">
                            {productData.sizes.map((item, index) => (
                                <button 
                                    onClick={() => setSize(item)} 
                                    key={index} 
                                    className={`border py-2 px-4 rounded-md font-semibold text-sm cursor-pointer transition ${size === item ? 'border-black bg-black text-white' : 'border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100'}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart CTA */}
                    <button 
                        onClick={() => addToCart(productData._id, size)} 
                        className="bg-black text-white px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md hover:bg-gray-800 active:bg-gray-900 transition cursor-pointer"
                    >
                        ADD TO CART
                    </button>

                    <hr className="mt-8 border-gray-200 w-full" />

                    {/* Guarantees */}
                    <div className="text-xs text-gray-500 mt-5 flex flex-col gap-1.5">
                        <p className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> 100% Original product guaranteed.</p>
                        <p className="flex items-center gap-2"><Truck size={16} className="text-blue-500" /> Cash on delivery is available on this product.</p>
                        <p className="flex items-center gap-2"><RotateCcw size={16} className="text-amber-500" /> Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description & Review Tab Bar */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border border-gray-300 px-5 py-3 text-xs sm:text-sm bg-white border-b-none rounded-t-md text-gray-900">Description</b>
                    <p className="border border-gray-300 px-5 py-3 text-xs sm:text-sm text-gray-500">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border border-gray-300 p-6 text-sm text-gray-500 bg-white rounded-b-md leading-relaxed">
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
                    <p>E-commerce websites have gained immense popularity due to their convenience, accessibility, and global reach. They offer a seamless shopping experience with detailed product information, images, user reviews, and secure checkout options.</p>
                </div>
            </div>

            {/* Display Related Products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : <div className="py-20 text-center text-gray-400">Loading product details...</div>;
};

export default Product;
