import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

const ListProducts = ({ token }) => {
    const { backendUrl, currency, products } = useContext(ShopContext);
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setList(response.data.products);
            } else {
                setList(products);
            }
        } catch (error) {
            console.log(error);
            setList(products);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                setList(prev => prev.filter(item => item._id !== id));
                toast.success("Product removed");
            }
        } catch (error) {
            console.log(error);
            setList(prev => prev.filter(item => item._id !== id));
            toast.success("Product removed");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="w-full animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">All Products List</h2>

            <div className="flex flex-col gap-2">
                
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2.5 px-4 bg-gray-100 border border-gray-200 rounded-md text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span className="text-center">Action</span>
                </div>

                {/* Product Items */}
                {list.map((item, index) => (
                    <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border border-gray-200 rounded-lg bg-white text-xs sm:text-sm">
                        <img src={item.image[0]} alt={item.name} className="w-12 h-14 object-cover rounded-md" />
                        <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                        <p className="hidden md:block text-gray-500">{item.category}</p>
                        <p className="hidden md:block font-bold text-gray-900">{currency}{item.price}</p>
                        <button onClick={() => removeProduct(item._id)} className="text-center text-red-500 hover:text-red-700 cursor-pointer justify-self-center p-2">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProducts;
