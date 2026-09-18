import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { Package, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const formatDateStr = (timestamp) => {
        if (!timestamp) return 'N/A';
        const d = new Date(timestamp);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const loadOrderData = async () => {
        try {
            if (!token) return;

            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
            if (response.data.success) {
                let allOrdersItem = [];
                response.data.orders.forEach((order) => {
                    if (Array.isArray(order.items)) {
                        const orderTimestamp = order.date || Date.now();
                        const deliveryTimestamp = order.deliveryDate || (orderTimestamp + (5 * 24 * 60 * 60 * 1000));
                        
                        order.items.forEach((item) => {
                            allOrdersItem.push({
                                ...item,
                                status: order.status,
                                payment: order.payment,
                                paymentMethod: order.paymentMethod,
                                date: orderTimestamp,
                                deliveryDate: deliveryTimestamp
                            });
                        });
                    }
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log("Error loading orders:", error);
            setOrderData([]);
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
                        <div key={index} className="py-5 px-6 border border-gray-200 rounded-xl bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs text-gray-700">
                            
                            {/* Product Info */}
                            <div className="flex items-start gap-6 text-sm">
                                <img className="w-16 sm:w-20 aspect-3/4 object-cover rounded-md border border-gray-100" src={item.image[0]} alt={item.name} />
                                <div className="space-y-1">
                                    <p className="sm:text-base font-semibold text-gray-900 mb-1">{item.name}</p>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
                                        <p className="font-bold text-gray-900">{currency}{item.price}</p>
                                        <span className="text-gray-300">|</span>
                                        <p>Quantity: <strong className="text-gray-900">{item.quantity}</strong></p>
                                        <span className="text-gray-300">|</span>
                                        <p>Size: <strong className="text-gray-900">{item.size}</strong></p>
                                    </div>

                                    {/* Order Date & Estimated Delivery Date */}
                                    <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                                        <p className="text-gray-500">
                                            Order Date: <span className="font-semibold text-gray-800">{formatDateStr(item.date)}</span>
                                        </p>
                                        <p className="text-rose-600 font-medium bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                                            🚚 Expected Delivery: <span className="font-bold">{formatDateStr(item.deliveryDate)}</span> <span className="text-[10px] text-rose-500">(5 Days)</span>
                                        </p>
                                        <p className="text-gray-400">
                                            Payment: <span className="text-gray-700 font-medium">{item.paymentMethod}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="md:w-1/3 flex justify-between items-center border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'Delivered' ? 'bg-emerald-500' : item.status === 'Shipped' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                                    <p className="text-xs sm:text-sm font-semibold text-gray-900">{item.status}</p>
                                </div>
                                <button 
                                    onClick={() => toast.info(`Order Status: ${item.status} | Delivery Date: ${formatDateStr(item.deliveryDate)}`)} 
                                    className="border border-gray-300 px-4 py-2 text-xs font-semibold rounded-md bg-white hover:bg-gray-50 cursor-pointer shadow-2xs"
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
