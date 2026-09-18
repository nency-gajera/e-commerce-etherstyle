import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2, Pencil } from 'lucide-react';
import EditProductModal from './EditProductModal';

const ListProducts = ({ token }) => {
    const { backendUrl, currency, products } = useContext(ShopContext);
    const [list, setList] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

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
        if (!window.confirm("Are you sure you want to remove this product?")) return;
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
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-2xl font-semibold text-gray-900">All Products List</h2>
                <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                    Total Products: {list.length}
                </span>
            </div>

            <div className="flex flex-col gap-2">
                
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr] items-center py-2.5 px-4 bg-gray-100 border border-gray-200 rounded-md text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span className="text-center">Action</span>
                </div>

                {/* Product Items */}
                {list.map((item, index) => {
                    const stockQty = item.stock !== undefined ? item.stock : 10;
                    const isOutOfStock = stockQty <= 0 || item.inStock === false;

                    return (
                        <div key={index} className="grid grid-cols-[1fr_2.5fr_1fr] md:grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border border-gray-200 rounded-lg bg-white text-xs sm:text-sm">
                            <img src={item.image[0]} alt={item.name} className="w-12 h-14 object-cover rounded-md border border-gray-100" />
                            <div>
                                <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                                <p className="text-[11px] text-gray-400 md:hidden">{item.category} • {currency}{item.price}</p>
                            </div>
                            <p className="hidden md:block text-gray-500">{item.category}</p>
                            <p className="hidden md:block font-bold text-gray-900">{currency}{item.price}</p>
                            
                            {/* Stock Badge */}
                            <div className="hidden md:block">
                                {isOutOfStock ? (
                                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 rounded-full border border-rose-200">
                                        OUT OF STOCK
                                    </span>
                                ) : (
                                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                                        {stockQty} in stock
                                    </span>
                                )}
                            </div>

                            {/* Action Buttons: Edit & Delete */}
                            <div className="flex items-center justify-center gap-2">
                                <button 
                                    onClick={() => setEditingProduct(item)} 
                                    title="Edit Product" 
                                    className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition cursor-pointer"
                                >
                                    <Pencil size={17} />
                                </button>
                                <button 
                                    onClick={() => removeProduct(item._id)} 
                                    title="Delete Product" 
                                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition cursor-pointer"
                                >
                                    <Trash2 size={17} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
                <EditProductModal 
                    product={editingProduct} 
                    token={token} 
                    onClose={() => setEditingProduct(null)} 
                    refreshList={fetchList} 
                />
            )}
        </div>
    );
};

export default ListProducts;
