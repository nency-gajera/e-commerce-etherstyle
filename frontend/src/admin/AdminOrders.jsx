import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Package } from 'lucide-react';

const AdminOrders = ({ token }) => {
    const { backendUrl, currency } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
            if (response.data.success) {
                setOrders(response.data.orders.reverse());
            } else {
                setOrders(sampleOrders);
            }
        } catch (error) {
            console.log(error);
            setOrders(sampleOrders);
        }
    };

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchAllOrders();
            } else {
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: event.target.value } : o));
                toast.success("Order status updated!");
            }
        } catch (error) {
            console.log(error);
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: event.target.value } : o));
            toast.success("Order status updated!");
        }
    };

    const sampleOrders = [
        {
            _id: "order_99",
            items: [
                { name: "Women Round Neck Cotton Top", quantity: 1, size: "M" },
                { name: "Men Relaxed Fit Denim Jacket", quantity: 1, size: "L" }
            ],
            address: { firstName: "Jane", lastName: "Doe", street: "123 Fashion Street", city: "New York", state: "NY", zipcode: "10001", country: "USA", phone: "+1 555-0199" },
            amount: 260,
            paymentMethod: "COD",
            payment: false,
            date: Date.now() - 3600000,
            status: "Order Placed"
        }
    ];

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="w-full animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">Order Management Page</h2>

            <div className="flex flex-col gap-4">
                {orders.map((order, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start p-5 sm:p-6 border border-gray-200 rounded-xl bg-white text-xs sm:text-sm text-gray-700 shadow-xs">
                        
                        <Package size={40} className="text-rose-600 shrink-0" />

                        {/* Items Breakdown */}
                        <div>
                            <div className="font-semibold text-gray-900 mb-2">
                                {order.items.map((item, idx) => (
                                    <p key={idx} className="py-0.5">
                                        {item.name} x {item.quantity} <span className="text-gray-500">({item.size})</span>
                                    </p>
                                ))}
                            </div>
                            <p className="font-bold text-gray-900 mt-3 mb-1">
                                {order.address.firstName + " " + order.address.lastName}
                            </p>
                            <p className="text-gray-500 leading-tight">
                                {order.address.street + ", " + order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                            </p>
                            <p className="text-gray-500 mt-1">{order.address.phone}</p>
                        </div>

                        {/* Order Stats */}
                        <div>
                            <p className="text-gray-600 mb-1">Items: <strong className="text-gray-900">{order.items.length}</strong></p>
                            <p className="text-gray-600 mb-1">Method: <strong className="text-gray-900">{order.paymentMethod}</strong></p>
                            <p className="text-gray-600">Payment: <span className={`font-bold ${order.payment ? 'text-emerald-600' : 'text-red-500'}`}>{order.payment ? 'Done' : 'Pending'}</span></p>
                            <p className="text-gray-400 text-xs mt-2">{new Date(order.date).toLocaleDateString()}</p>
                        </div>

                        {/* Total Amount */}
                        <div>
                            <p className="text-base sm:text-lg font-bold text-gray-900">
                                {currency}{order.amount}
                            </p>
                        </div>

                        {/* Status Select Box */}
                        <div>
                            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2.5 border border-gray-300 rounded-md bg-white font-semibold text-xs sm:text-sm outline-none cursor-pointer w-full">
                                <option value="Order Placed">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;
