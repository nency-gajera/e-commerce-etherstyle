import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { X, UploadCloud } from 'lucide-react';

const EditProductModal = ({ product, token, onClose, refreshList }) => {
    const { backendUrl, getProductsData } = useContext(ShopContext);

    const [name, setName] = useState(product.name || "");
    const [description, setDescription] = useState(product.description || "");
    const [price, setPrice] = useState(product.price || "");
    const [stock, setStock] = useState(product.stock !== undefined ? product.stock : 10);
    const [category, setCategory] = useState(product.category || "Men");
    const [subCategory, setSubCategory] = useState(product.subCategory || "T-shirts");
    const [bestseller, setBestseller] = useState(product.bestseller || false);
    const [sizes, setSizes] = useState(product.sizes || []);

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("id", product._id);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("stock", stock);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/update", formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message || "Product Updated!");
                await getProductsData();
                await refreshList();
                onClose();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-center items-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <h3 className="font-serif text-2xl font-bold text-gray-900">Edit Product</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 cursor-pointer">
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 text-gray-700 text-sm">
                    
                    {/* Current & Replacement Images */}
                    <div>
                        <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-2">Update Images (Optional)</p>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {[
                                { state: image1, setter: setImage1, id: 'edit-img1', original: product.image[0] },
                                { state: image2, setter: setImage2, id: 'edit-img2', original: product.image[1] },
                                { state: image3, setter: setImage3, id: 'edit-img3', original: product.image[2] },
                                { state: image4, setter: setImage4, id: 'edit-img4', original: product.image[3] }
                            ].map((imgItem, idx) => (
                                <label key={idx} htmlFor={imgItem.id} className="border-2 border-dashed border-gray-300 rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer bg-white overflow-hidden hover:border-gray-400 shrink-0">
                                    {imgItem.state ? (
                                        <img src={URL.createObjectURL(imgItem.state)} alt="" className="w-full h-full object-cover" />
                                    ) : imgItem.original ? (
                                        <img src={imgItem.original} alt="" className="w-full h-full object-cover opacity-80" />
                                    ) : (
                                        <UploadCloud size={24} className="text-gray-400" />
                                    )}
                                    <input onChange={(e) => imgItem.setter(e.target.files[0])} type="file" id={imgItem.id} hidden />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1">Product Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md outline-none bg-white" />
                    </div>

                    {/* Description */}
                    <div>
                        <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1">Description</p>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows={3} required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md outline-none bg-white font-sans" />
                    </div>

                    {/* Category, SubCategory, Price, Stock */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                            <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1">Category</p>
                            <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white outline-none">
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div>
                            <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1">Sub Category</p>
                            <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white outline-none">
                                <option value="T-shirts">T-shirts</option>
                                <option value="Shirts">Shirts</option>
                                <option value="Jeans">Jeans</option>
                                <option value="Dresses">Dresses</option>
                                <option value="Topwear">Topwear</option>
                                <option value="Bottomwear">Bottomwear</option>
                                <option value="Winterwear">Winterwear</option>
                            </select>
                        </div>
                        <div>
                            <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1">Price (₹)</p>
                            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md outline-none bg-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1">Stock Qty</p>
                            <input onChange={(e) => setStock(e.target.value)} value={stock} type="number" min="0" required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md outline-none bg-white font-bold text-rose-600" />
                        </div>
                    </div>

                    {/* Sizes Selection */}
                    <div>
                        <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1.5">Available Sizes</p>
                        <div className="flex flex-wrap gap-2">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <div 
                                    key={size} 
                                    onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                                    className={`px-3.5 py-2 border rounded-xl cursor-pointer font-semibold text-xs transition ${sizes.includes(size) ? 'bg-black text-white border-black shadow-xs' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bestseller Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-800 my-1">
                        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" className="w-4 h-4 text-black rounded border-gray-300" />
                        Add to bestseller
                    </label>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 font-semibold text-xs uppercase hover:bg-gray-50 cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="px-8 py-2.5 bg-black text-white rounded-md font-bold text-xs uppercase hover:bg-gray-800 transition cursor-pointer">
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
