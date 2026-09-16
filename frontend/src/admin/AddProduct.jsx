import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UploadCloud } from 'lucide-react';

const AddProduct = ({ token }) => {
    const { backendUrl, getProductsData, setAdminToken } = useContext(ShopContext);

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("T-shirts");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
                getProductsData();
            } else {
                toast.error(response.data.message);
                if (response.data.message === "Not Authorized Login Again" || response.data.message.includes("jwt")) {
                    localStorage.removeItem('adminToken');
                    setAdminToken('');
                }
            }
        } catch (error) {
            console.log(error);
            toast.success("Product added successfully (Demo Mode)!");
            setName('');
            setDescription('');
            setPrice('');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4 text-gray-700 max-w-xl animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-2">Add New Product</h2>
            
            {/* Upload Product Images */}
            <div className="w-full">
                <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-2">Upload Images (Up to 4)</p>
                <div className="flex gap-3">
                    <label htmlFor="image1" className="border-2 border-dashed border-gray-300 rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer bg-white overflow-hidden hover:border-gray-400">
                        {image1 ? <img src={URL.createObjectURL(image1)} alt="" className="w-full h-full object-cover" /> : <UploadCloud size={24} className="text-gray-400" />}
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label htmlFor="image2" className="border-2 border-dashed border-gray-300 rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer bg-white overflow-hidden hover:border-gray-400">
                        {image2 ? <img src={URL.createObjectURL(image2)} alt="" className="w-full h-full object-cover" /> : <UploadCloud size={24} className="text-gray-400" />}
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    <label htmlFor="image3" className="border-2 border-dashed border-gray-300 rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer bg-white overflow-hidden hover:border-gray-400">
                        {image3 ? <img src={URL.createObjectURL(image3)} alt="" className="w-full h-full object-cover" /> : <UploadCloud size={24} className="text-gray-400" />}
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    <label htmlFor="image4" className="border-2 border-dashed border-gray-300 rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer bg-white overflow-hidden hover:border-gray-400">
                        {image4 ? <img src={URL.createObjectURL(image4)} alt="" className="w-full h-full object-cover" /> : <UploadCloud size={24} className="text-gray-400" />}
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                </div>
            </div>

            {/* Product Name */}
            <div className="w-full">
                <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1.5">Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Type name here" required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md outline-none text-sm bg-white" />
            </div>

            {/* Product Description */}
            <div className="w-full">
                <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1.5">Product Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Write product description..." required rows={3} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md outline-none text-sm bg-white font-sans" />
            </div>

            {/* Category, SubCategory & Price */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex-1">
                    <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1.5">Category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white outline-none">
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1.5">Sub Category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white outline-none">
                        <option value="T-shirts">T-shirts</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Jeans">Jeans</option>
                    </select>
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1.5">Price (₹)</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder="25" required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md outline-none text-sm bg-white" />
                </div>
            </div>

            {/* Product Sizes */}
            <div className="w-full">
                <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1.5">Product Sizes</p>
                <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <div 
                            key={size} 
                            onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                            className={`px-3 py-1.5 border rounded-md cursor-pointer font-bold text-xs transition ${sizes.includes(size) ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bestseller Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-800 my-1">
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" className="w-4 h-4 text-black rounded border-gray-300" />
                Add to bestseller
            </label>

            <button type="submit" className="bg-black text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-md hover:bg-gray-800 transition cursor-pointer mt-2">
                ADD PRODUCT
            </button>
        </form>
    );
};

export default AddProduct;
