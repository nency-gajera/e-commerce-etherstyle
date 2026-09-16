import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { Users, Mail, ShieldCheck, KeyRound } from 'lucide-react';

const AdminUsers = ({ token }) => {
    const { backendUrl } = useContext(ShopContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(backendUrl + '/api/user/list', { headers: { token } });
            if (response.data.success) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    return (
        <div className="w-full animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="font-serif text-2xl font-semibold text-gray-900 flex items-center gap-2.5">
                        <Users size={26} className="text-rose-600" /> Registered Members
                    </h2>
                    <p className="text-gray-500 text-xs mt-1">Manage and view registered user accounts in MongoDB database</p>
                </div>
                <div className="bg-rose-50 text-rose-700 px-3 py-1.5 rounded-full text-xs font-bold border border-rose-200">
                    Total Members: {users.length}
                </div>
            </div>

            {loading ? (
                <div className="py-12 text-center text-gray-400">Loading registered members...</div>
            ) : users.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500">
                    <Users size={48} className="mx-auto mb-3 text-gray-300" />
                    <p className="font-semibold text-base">No registered members found yet.</p>
                    <p className="text-xs text-gray-400 mt-1">New accounts created during registration or checkout will appear here.</p>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
                    <table className="w-full text-left text-xs sm:text-sm text-gray-700">
                        <thead className="bg-gray-50 text-gray-900 uppercase font-bold text-[11px] tracking-wider border-b border-gray-200">
                            <tr>
                                <th className="py-3.5 px-6">User Name</th>
                                <th className="py-3.5 px-6">Email Address</th>
                                <th className="py-3.5 px-6">User ID (MongoDB)</th>
                                <th className="py-3.5 px-6">Security Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-50/80 transition">
                                    <td className="py-4 px-6 font-semibold text-gray-900 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <span>{user.name || "Member"}</span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} className="text-gray-400" />
                                            <span>{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-mono text-xs text-gray-500">
                                        {user._id}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            <ShieldCheck size={13} /> Encrypted Password (Bcrypt)
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
