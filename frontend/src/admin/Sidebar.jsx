import React from 'react';
import { PlusCircle, List, ShoppingBag, Users } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-[20%] sm:w-[18%] min-h-screen border-r border-gray-200 bg-white flex flex-col gap-3 pt-6 px-3 sm:px-6 text-sm font-semibold">
            
            <button 
                onClick={() => setActiveTab('add')} 
                className={`flex items-center gap-3 border px-3 sm:px-4 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'add' ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
                <PlusCircle size={18} className="shrink-0" />
                <span className="hidden sm:inline">Add Items</span>
            </button>

            <button 
                onClick={() => setActiveTab('list')} 
                className={`flex items-center gap-3 border px-3 sm:px-4 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'list' ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
                <List size={18} className="shrink-0" />
                <span className="hidden sm:inline">List Items</span>
            </button>

            <button 
                onClick={() => setActiveTab('orders')} 
                className={`flex items-center gap-3 border px-3 sm:px-4 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'orders' ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
                <ShoppingBag size={18} className="shrink-0" />
                <span className="hidden sm:inline">Orders</span>
            </button>

            <button 
                onClick={() => setActiveTab('users')} 
                className={`flex items-center gap-3 border px-3 sm:px-4 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'users' ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
                <Users size={18} className="shrink-0" />
                <span className="hidden sm:inline">Members</span>
            </button>
        </div>
    );
};

export default Sidebar;
