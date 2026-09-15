import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    return showSearch && visible ? (
        <div className="border-t border-b border-gray-200 bg-gray-50 text-center py-4 px-4 transition-all">
            <div className="inline-flex items-center justify-between border border-gray-300 bg-white px-5 py-2 rounded-full w-full sm:w-1/2 max-w-md shadow-xs">
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    placeholder="Search products by title, category..." 
                    className="flex-1 outline-none bg-inherit text-sm text-gray-700 placeholder-gray-400"
                />
                <Search size={18} className="text-gray-500" />
            </div>
            <button onClick={() => setShowSearch(false)} className="inline-block ml-3 cursor-pointer align-middle text-gray-500 hover:text-black">
                <X size={20} />
            </button>
        </div>
    ) : null;
};

export default SearchBar;
