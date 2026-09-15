import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { Filter, ChevronRight } from 'lucide-react';

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        setFilterProducts(productsCopy);
    };

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;
            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200 animate-fade-in">
            
            {/* Filter Options Sidebar */}
            <div className="min-w-60">
                <p 
                    onClick={() => setShowFilter(!showFilter)} 
                    className="my-2 text-xl flex items-center gap-2 cursor-pointer uppercase font-bold text-gray-800"
                >
                    <Filter size={18} />
                    FILTERS
                    <ChevronRight size={16} className={`sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} />
                </p>

                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-4 mt-6 rounded-lg bg-white ${showFilter ? '' : 'hidden sm:block'}`}>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-800">CATEGORIES</p>
                    <div className="flex flex-col gap-2.5 text-sm font-light text-gray-700">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                            <input className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                            <input className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                            <input className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
                        </label>
                    </div>
                </div>

                {/* SubCategory Filter */}
                <div className={`border border-gray-300 pl-5 py-4 my-5 rounded-lg bg-white ${showFilter ? '' : 'hidden sm:block'}`}>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-800">TYPE</p>
                    <div className="flex flex-col gap-2.5 text-sm font-light text-gray-700">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                            <input className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                            <input className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                            <input className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
                        </label>
                    </div>
                </div>
            </div>

            {/* Right Side Product Grid */}
            <div className="flex-1">
                <div className="flex justify-between items-center text-base sm:text-2xl mb-6">
                    <h2 className="font-serif uppercase text-xl sm:text-2xl text-gray-900">
                        ALL <span className="text-gray-500 font-normal">COLLECTIONS</span>
                    </h2>
                    {/* Product Sort Dropdown */}
                    <select 
                        onChange={(e) => setSortType(e.target.value)} 
                        className="border-2 border-gray-300 text-xs sm:text-sm px-3 py-2 rounded-md bg-white outline-none cursor-pointer"
                    >
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map Products */}
                {filterProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-base">No products match your selected filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                        {filterProducts.map((item, index) => (
                            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Collection;
