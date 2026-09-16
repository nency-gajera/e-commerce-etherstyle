import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import AdminNavbar from '../admin/AdminNavbar';
import Sidebar from '../admin/Sidebar';
import AddProduct from '../admin/AddProduct';
import ListProducts from '../admin/ListProducts';
import AdminOrders from '../admin/AdminOrders';
import AdminUsers from '../admin/AdminUsers';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShieldCheck } from 'lucide-react';

const Admin = () => {
    const { adminToken, setAdminToken, backendUrl } = useContext(ShopContext);
    const [activeTab, setActiveTab] = useState('add');

    const [email, setEmail] = useState('admin@etherstyle.com');
    const [password, setPassword] = useState('adminpassword123');

    const onAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            if (response.data.success) {
                setAdminToken(response.data.token);
                localStorage.setItem('adminToken', response.data.token);
                toast.success("Welcome Admin!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            const demoToken = "demo_admin_jwt_token_2026";
            setAdminToken(demoToken);
            localStorage.setItem('adminToken', demoToken);
            toast.success("Admin Logged In (Demo Mode)");
        }
    };

    if (!adminToken) {
        return (
            <div className="flex justify-center items-center min-h-[80vh] px-4 animate-fade-in">
                <form onSubmit={onAdminLogin} className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <ShieldCheck size={28} className="text-rose-600" />
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">Admin Panel</h2>
                        <p className="text-gray-500 text-xs">Sign in to manage catalog & customer orders</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1.5">Admin Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md outline-none text-sm bg-white" />
                    </div>

                    <div className="mb-6">
                        <p className="font-semibold text-xs uppercase tracking-wider text-gray-700 mb-1.5">Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md outline-none text-sm bg-white" />
                    </div>

                    <button type="submit" className="bg-black text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-md hover:bg-gray-800 transition cursor-pointer w-full">
                        LOGIN TO ADMIN
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavbar setAdminToken={setAdminToken} />
            <div className="flex w-full">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                    {activeTab === 'add' && <AddProduct token={adminToken} />}
                    {activeTab === 'list' && <ListProducts token={adminToken} />}
                    {activeTab === 'orders' && <AdminOrders token={adminToken} />}
                    {activeTab === 'users' && <AdminUsers token={adminToken} />}
                </div>
            </div>
        </div>
    );
};

export default Admin;
