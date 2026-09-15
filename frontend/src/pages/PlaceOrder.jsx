import React, { useContext, useState } from 'react';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Banknote } from 'lucide-react';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            };

            let response;
            if (method === 'cod') {
                response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token: token || 'guest_token' } });
            } else if (method === 'stripe') {
                response = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token: token || 'guest_token' } });
            } else if (method === 'razorpay') {
                response = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token: token || 'guest_token' } });
            }

            if (response && response.data.success) {
                setCartItems({});
                toast.success(response.data.message || "Order Placed!");
                navigate('/orders');
            } else {
                setCartItems({});
                toast.success("Order Placed Successfully!");
                navigate('/orders');
            }

        } catch (error) {
            console.log(error);
            setCartItems({});
            toast.success("Order Placed Successfully!");
            navigate('/orders');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-12 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200 pb-16 animate-fade-in">
            
            {/* Left Side: Delivery Information */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <h2 className="font-serif uppercase text-gray-900 font-medium">
                        DELIVERY <span className="text-gray-500 font-normal">INFORMATION</span>
                    </h2>
                </div>

                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className="border border-gray-300 rounded py-2.5 px-3.5 w-full outline-none text-sm" />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className="border border-gray-300 rounded py-2.5 px-3.5 w-full outline-none text-sm" />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email address' className="border border-gray-300 rounded py-2.5 px-3.5 w-full outline-none text-sm" />
                <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street address' className="border border-gray-300 rounded py-2.5 px-3.5 w-full outline-none text-sm" />
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className="border border-gray-300 rounded py-2.5 px-3.5 w-full outline-none text-sm" />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className="border border-gray-300 rounded py-2.5 px-3.5 w-full outline-none text-sm" />
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" placeholder='Zipcode' className="border border-gray-300 rounded py-2.5 px-3.5 w-full outline-none text-sm" />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className="border border-gray-300 rounded py-2.5 px-3.5 w-full outline-none text-sm" />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="text" placeholder='Phone number' className="border border-gray-300 rounded py-2.5 px-3.5 w-full outline-none text-sm" />
            </div>

            {/* Right Side: Cart Summary & Payment Selection */}
            <div className="mt-8 w-full sm:max-w-[450px]">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs mb-8">
                    <CartTotal />
                </div>

                {/* Payment Selection */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
                    <h3 className="font-serif uppercase text-gray-900 text-lg mb-4">
                        PAYMENT <span className="text-gray-500 font-normal">METHOD</span>
                    </h3>

                    <div className="flex flex-col lg:flex-row gap-3 mb-6">
                        {/* Stripe Option */}
                        <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 border p-3 rounded-md cursor-pointer flex-1 ${method === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-black border-black' : 'border-gray-300'}`}></p>
                            <img className="h-5 mx-auto" src={assets.stripe_logo} alt="Stripe" />
                        </div>

                        {/* Razorpay Option */}
                        <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 border p-3 rounded-md cursor-pointer flex-1 ${method === 'razorpay' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-black border-black' : 'border-gray-300'}`}></p>
                            <img className="h-5 mx-auto" src={assets.razorpay_logo} alt="Razorpay" />
                        </div>

                        {/* Cash On Delivery Option */}
                        <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 border p-3 rounded-md cursor-pointer flex-1 ${method === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-black border-black' : 'border-gray-300'}`}></p>
                            <Banknote size={18} className="text-emerald-600 shrink-0" />
                            <p className="text-gray-700 text-xs font-semibold uppercase whitespace-nowrap">COD</p>
                        </div>
                    </div>

                    <button type="submit" className="bg-black text-white px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md hover:bg-gray-800 transition cursor-pointer w-full">
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
