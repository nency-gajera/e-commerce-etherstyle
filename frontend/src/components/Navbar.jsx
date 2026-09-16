import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Search, User, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setUser } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('');
        setUser(null);
    };

    return (
        <div className="flex items-center justify-between py-5 font-medium border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
            
            {/* Brand Logo */}
            <Link to='/' className="flex items-center gap-1">
                <span className="font-serif text-2xl font-bold text-gray-900">
                    ETHERSTYLE<span className="text-rose-600">.</span>
                </span>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden sm:flex gap-6 text-xs sm:text-sm text-gray-700 uppercase tracking-wider font-semibold">
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to='/collection' className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to='/about' className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to='/contact' className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 sm:gap-6">
                
                {/* Admin Switcher Button */}
                <Link 
                    to="/admin" 
                    title="Admin Panel" 
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-full text-xs font-bold hover:bg-rose-100 transition shadow-xs"
                >
                    <ShieldCheck size={15} />
                    <span>ADMIN</span>
                </Link>

                {/* Search Icon */}
                <button onClick={() => { setShowSearch(true); navigate('/collection'); }} className="cursor-pointer text-gray-700 hover:text-black">
                    <Search size={20} />
                </button>

                {/* Profile Icon / Dropdown */}
                <div className="group relative">
                    <button onClick={() => !token && navigate('/login')} className="cursor-pointer text-gray-700 hover:text-black flex items-center">
                        <User size={20} />
                    </button>
                    
                    {token && (
                        <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-100 text-sm">
                                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black font-medium">Orders</p>
                                <p onClick={logout} className="cursor-pointer hover:text-rose-600 font-medium pt-1 border-t border-gray-100">Logout</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Shopping Cart Icon with Live Counter */}
                <Link to='/cart' className="relative cursor-pointer text-gray-700 hover:text-black">
                    <ShoppingBag size={22} />
                    {getCartCount() > 0 && (
                        <p className="absolute -right-1.5 -bottom-1.5 w-4.5 h-4.5 leading-4.5 bg-black text-white text-[10px] font-bold rounded-full text-center flex items-center justify-center">
                            {getCartCount()}
                        </p>
                    )}
                </Link>

                {/* Mobile Hamburger Menu Icon */}
                <button onClick={() => setVisible(true)} className="sm:hidden cursor-pointer text-gray-700">
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Drawer Navigation */}
            <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white z-50 transition-all ${visible ? 'w-full px-6 py-5' : 'w-0'}`}>
                <div className="flex flex-col text-gray-700 h-full">
                    <div onClick={() => setVisible(false)} className="flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer">
                        <span className="font-serif text-xl font-bold">ETHERSTYLE.</span>
                        <X size={24} />
                    </div>
                    <div className="flex flex-col gap-4 mt-6 text-base font-semibold uppercase">
                        <NavLink onClick={() => setVisible(false)} className="py-2 border-b border-gray-100" to='/'>HOME</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="py-2 border-b border-gray-100" to='/collection'>COLLECTION</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="py-2 border-b border-gray-100" to='/about'>ABOUT</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="py-2 border-b border-gray-100" to='/contact'>CONTACT</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="py-2 text-rose-600 font-bold" to='/admin'>ADMIN PANEL</NavLink>
                    </div>
                </div>
            </div>

            <style>{`
                .active hr {
                    display: block !important;
                }
            `}</style>
        </div>
    );
};

export default Navbar;
