import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    return (
        <div className="w-full">
            <div className="text-xl sm:text-2xl mb-3">
                <h3 className="font-serif uppercase text-gray-900 font-medium">
                    CART <span className="text-gray-500 font-normal">TOTALS</span>
                </h3>
            </div>

            <div className="flex flex-col gap-2.5 text-sm text-gray-700">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                    <p>Subtotal</p>
                    <p className="font-semibold text-gray-900">{currency} {getCartAmount()}.00</p>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                    <p>Shipping Fee</p>
                    <p className="font-semibold text-gray-900">{currency} {getCartAmount() === 0 ? 0 : delivery_fee}.00</p>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
                    <p>Total</p>
                    <p>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
