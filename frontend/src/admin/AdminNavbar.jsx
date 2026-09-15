import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ setAdminToken }) => {
    const handleLogout = () => {
        setAdminToken('');
        localStorage.removeItem('adminToken');
    };

    return (
        <div className="flex items-center justify-between px-[4%] py-3 bg-white border-b border-gray-200 shadow-xs sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-black font-semibold">
                    <ArrowLeft size={16} /> Back to Store
                </Link>
                <span className="text-gray-300">|</span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    FOREVER <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-md font-sans tracking-wider uppercase font-bold">ADMIN PANEL</span>
                </span>
            </div>

            <button onClick={handleLogout} className="bg-gray-900 text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-full flex items-center gap-2 hover:bg-black transition cursor-pointer">
                <LogOut size={16} /> Logout
            </button>
        </div>
    );
};

export default AdminNavbar;
