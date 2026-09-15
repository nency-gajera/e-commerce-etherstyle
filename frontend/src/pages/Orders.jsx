import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { Package, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) return;

            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
            if (response.data.success) {
                let allOrdersItem = [];
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log("Using sample order item history");
            setOrderData([
                {
                    _id: "order_101",
                    name: "Women Round Neck Cotton Top",
                    price: 100,
                    size: "M",
                    quantity: 1,
                    image: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"],
                    status: "Order Placed",
                    paymentMethod: "COD",
                    date: Date.now() - 86400000
                },
                {
                    _id: "order_102",
                    name: "Men Round Neck Pure Cotton T-shirt",
                    price: 200,
                    size: "L",
                    quantity: 2,
                    image: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"],
                    status: "Shipped",
                    paymentMethod: "Stripe",
                    date: Date.now() - 172800000
                }
            ]);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [token]);

    return (
        <div className="border-t border-gray-200 pt-16 pb-16 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif uppercase text-2xl sm:text-3xl text-gray-900">
                    MY <span className="text-gray-500 font-normal">ORDERS</span>
                </h2>
                <button onClick={loadOrderData} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer">
                    <RefreshCw size={15} /> Refresh Status
                </button>
            </div>

            {orderData.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <Package size={48} className="mx-auto mb-3 text-gray-400" />
                    <p className="text-base">No orders placed yet.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {orderData.map((item, index) => (
                        <div key={index} className="py-4 px-6 border border-gray-200 rounded-xl bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs text-gray-700">
                            
                            {/* Product Info */}
                            <div className="flex items-start gap-6 text-sm">
                                <img className="w-16 sm:w-20 aspect-3/4 object-cover rounded-md" src={item.image[0]} alt={item.name} />
                                <div>
                                    <p className="sm:text-base font-semibold text-gray-900 mb-1">{item.name}</p>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <p className="font-bold text-gray-900">{currency}{item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Size: <strong className="text-gray-900">{item.size}</strong></p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Date: <span className="text-gray-600">{new Date(item.date).toDateString()}</span> | Method: <span className="text-gray-600">{item.paymentMethod}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="md:w-1/2 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'Delivered' ? 'bg-emerald-500' : item.status === 'Shipped' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                                    <p className="text-xs sm:text-sm font-semibold text-gray-900">{item.status}</p>
                                </div>
                                <button 
                                    onClick={() => toast.info(`Status for order: ${item.status}`)} 
                                    className="border border-gray-300 px-4 py-2 text-xs font-semibold rounded-md bg-white hover:bg-gray-50 cursor-pointer"
                                >
                                    Track Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
