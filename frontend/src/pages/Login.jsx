import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [currentState, setCurrentState] = useState('Login'); // 'Login' or 'Sign Up'
    const { token, setToken, setUser, navigate, backendUrl, addToCart } = useContext(ShopContext);
    const location = useLocation();

    // Form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UI Toggles
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forgotModalOpen, setForgotModalOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetSending, setResetSending] = useState(false);

    const redirectAfterLogin = (userToken, userData) => {
        setToken(userToken);
        setUser(userData);
        localStorage.setItem('token', userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success(currentState === 'Sign Up' ? "Account created successfully! Welcome to Etherstyle." : "Logged in successfully!");

        const pendingItem = sessionStorage.getItem('pendingCartItem');
        if (pendingItem) {
            try {
                const { itemId, size } = JSON.parse(pendingItem);
                sessionStorage.removeItem('pendingCartItem');
                addToCart(itemId, size, userToken);
            } catch (e) {
                console.error("Pending cart item error:", e);
            }
        }

        const targetPath = location.state?.from || sessionStorage.getItem('redirectPath') || '/';
        sessionStorage.removeItem('redirectPath');
        navigate(targetPath);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            if (currentState === 'Sign Up') {
                if (password !== confirmPassword) {
                    toast.error("Passwords do not match. Please check and try again.");
                    setLoading(false);
                    return;
                }
                if (password.length < 6) {
                    toast.error("Password must be at least 6 characters long.");
                    setLoading(false);
                    return;
                }

                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                if (response.data.success) {
                    redirectAfterLogin(response.data.token, response.data.user);
                } else {
                    toast.error(response.data.message || "Registration failed.");
                }
            } else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password });
                if (response.data.success) {
                    redirectAfterLogin(response.data.token, response.data.user);
                } else {
                    toast.error(response.data.message || "Invalid credentials.");
                }
            }
        } catch (error) {
            console.error("Auth error:", error);
            toast.error(error.response?.data?.message || "Unable to connect to server. Please check your network.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotSubmit = (e) => {
        e.preventDefault();
        if (!resetEmail) {
            toast.error("Please enter your email address.");
            return;
        }
        setResetSending(true);
        setTimeout(() => {
            setResetSending(false);
            setForgotModalOpen(false);
            toast.success(`Password reset instructions sent to ${resetEmail}`);
            setResetEmail('');
        }, 1200);
    };

    useEffect(() => {
        if (token) {
            const targetPath = location.state?.from || sessionStorage.getItem('redirectPath') || '/';
            sessionStorage.removeItem('redirectPath');
            navigate(targetPath);
        }
    }, [token]);

    return (
        <div className="min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
                
                {/* Left Side Banner (Flipkart / E-commerce style) */}
                <div className="md:col-span-5 bg-gradient-to-br from-gray-900 via-black to-rose-950 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider text-rose-300 uppercase mb-6">
                            ETHERSTYLE PREMIER
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-4">
                            {currentState === 'Login' ? 'Welcome Back to Luxury.' : 'Join the Style Revolution.'}
                        </h2>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            {currentState === 'Login' 
                                ? 'Sign in to access your curated wishlist, track active orders, and enjoy express 1-click checkout.'
                                : 'Create your Etherstyle account today to unlock member discounts, early access sales, and order tracking.'
                            }
                        </p>
                    </div>

                    <div className="relative z-10 space-y-3 border-t border-white/10 pt-6">
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                            <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold">✓</span>
                            <span>100% Genuine Signature Collections</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                            <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold">✓</span>
                            <span>Express Shipping & Easy Returns</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                            <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold">✓</span>
                            <span>256-Bit Encrypted Secure Checkout</span>
                        </div>
                    </div>
                </div>

                {/* Right Side Form Panel */}
                <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
                    
                    {/* Modern Tab Switcher */}
                    <div className="flex border-b border-gray-200 mb-8">
                        <button
                            type="button"
                            onClick={() => { setCurrentState('Login'); setPassword(''); setConfirmPassword(''); }}
                            className={`pb-3 px-4 font-bold text-sm transition relative cursor-pointer ${currentState === 'Login' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Sign In
                            {currentState === 'Login' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full"></span>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => { setCurrentState('Sign Up'); setPassword(''); setConfirmPassword(''); }}
                            className={`pb-3 px-4 font-bold text-sm transition relative cursor-pointer ${currentState === 'Sign Up' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Create Account
                            {currentState === 'Sign Up' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full"></span>
                            )}
                        </button>
                    </div>

                    <form onSubmit={onSubmitHandler} className="space-y-4">
                        
                        {/* Full Name Input (Sign Up only) */}
                        {currentState === 'Sign Up' && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input 
                                        onChange={(e) => setName(e.target.value)} 
                                        value={name} 
                                        type="text" 
                                        placeholder="Enter your full name" 
                                        required 
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none text-sm bg-gray-50/50 focus:bg-white focus:border-black transition" 
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email} 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    required 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none text-sm bg-gray-50/50 focus:bg-white focus:border-black transition" 
                                />
                            </div>
                        </div>

                        {/* Password Input with Show/Hide Toggle */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</label>
                                {currentState === 'Login' && (
                                    <button 
                                        type="button" 
                                        onClick={() => setForgotModalOpen(true)} 
                                        className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                                    >
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password} 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    required 
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl outline-none text-sm bg-gray-50/50 focus:bg-white focus:border-black transition" 
                                />
                                {/* Show / Hide Password Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700 cursor-pointer"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        // Eye Off Icon
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                                        </svg>
                                    ) : (
                                        // Eye Icon
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input (Sign Up only) */}
                        {currentState === 'Sign Up' && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <input 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        value={confirmPassword} 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        placeholder="Confirm your password" 
                                        required 
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl outline-none text-sm bg-gray-50/50 focus:bg-white focus:border-black transition" 
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700 cursor-pointer"
                                        title={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-black text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl hover:bg-gray-800 active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-6 disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>{currentState === 'Login' ? 'Signing In...' : 'Creating Account...'}</span>
                                </>
                            ) : (
                                <span>{currentState === 'Login' ? 'Sign In to Etherstyle' : 'Create Free Account'}</span>
                            )}
                        </button>
                    </form>

                    {/* Footer Toggle text */}
                    <div className="mt-8 text-center text-xs text-gray-500">
                        {currentState === 'Login' ? (
                            <p>
                                Don't have an account yet?{' '}
                                <button 
                                    onClick={() => { setCurrentState('Sign Up'); setPassword(''); setConfirmPassword(''); }} 
                                    className="font-bold text-black hover:underline cursor-pointer"
                                >
                                    Create one now
                                </button>
                            </p>
                        ) : (
                            <p>
                                Already have an Etherstyle account?{' '}
                                <button 
                                    onClick={() => { setCurrentState('Login'); setPassword(''); setConfirmPassword(''); }} 
                                    className="font-bold text-black hover:underline cursor-pointer"
                                >
                                    Sign in here
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {forgotModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
                        <button 
                            onClick={() => setForgotModalOpen(false)} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-xl font-bold text-gray-900">Reset Your Password</h3>
                            <p className="text-xs text-gray-500 mt-1">Enter your registered email address and we'll send you instructions to reset your password.</p>
                        </div>

                        <form onSubmit={handleForgotSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                                <input 
                                    type="email" 
                                    value={resetEmail} 
                                    onChange={(e) => setResetEmail(e.target.value)} 
                                    placeholder="name@example.com" 
                                    required 
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:border-black"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setForgotModalOpen(false)}
                                    className="w-1/2 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={resetSending}
                                    className="w-1/2 py-2.5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition cursor-pointer flex items-center justify-center gap-2"
                                >
                                    {resetSending ? "Sending..." : "Send Reset Link"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
