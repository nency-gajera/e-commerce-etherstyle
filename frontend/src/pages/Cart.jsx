import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    return (
        <div className="border-t border-gray-200 pt-14 pb-16 animate-fade-in">
            <div className="text-2xl mb-6">
                <h2 className="font-serif uppercase text-2xl sm:text-3xl text-gray-900">
                    YOUR <span className="text-gray-500 font-normal">CART</span>
                </h2>
            </div>

            {cartData.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-lg text-gray-500 mb-6">Your shopping cart is currently empty.</p>
                    <button onClick={() => navigate('/collection')} className="btn-primary">
                        EXPLORE CATALOG
                    </button>
                </div>
            ) : (
                <div>
                    {/* Cart Items List */}
                    <div className="flex flex-col gap-4 mb-12">
                        {cartData.map((item, index) => {
                            const productData = products.find((product) => product._id === item._id);
                            if (!productData) return null;

                            return (
                                <div key={index} className="py-4 px-4 sm:px-6 border border-gray-200 rounded-xl bg-white grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 shadow-xs">
                                    
                                    {/* Item Details */}
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <img 
                                            src={productData.image[0]} 
                                            alt={productData.name} 
                                            className="w-16 sm:w-20 aspect-3/4 object-cover rounded-md" 
                                        />
                                        <div>
                                            <p className="text-xs sm:text-base font-semibold text-gray-900 mb-1">{productData.name}</p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <p className="font-bold text-sm sm:text-base text-gray-900">{currency}{productData.price}</p>
                                                <p className="px-2 sm:px-3 py-1 border border-gray-300 bg-gray-50 rounded text-xs font-bold">{item.size}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Input */}
                                    <input 
                                        onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                                        className="border border-gray-300 rounded max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center outline-none text-sm font-semibold" 
                                        type="number" 
                                        min={1} 
                                        defaultValue={item.quantity} 
                                    />

                                    {/* Delete Icon */}
                                    <div className="text-right">
                                        <button onClick={() => updateQuantity(item._id, item.size, 0)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Cart Summary & Checkout */}
                    <div className="flex justify-end my-10">
                        <div className="w-full sm:w-[450px] bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-xs">
                            <CartTotal />
                            <div className="w-full text-end mt-8">
                                <button onClick={() => navigate('/place-order')} className="bg-black text-white text-xs sm:text-sm my-2 px-8 py-3.5 font-bold uppercase tracking-wider rounded-md hover:bg-gray-800 transition cursor-pointer w-full">
                                    PROCEED TO CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
