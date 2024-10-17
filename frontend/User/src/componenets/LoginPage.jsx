import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import useFormValidation from '../hooks/useFormValidation'; // Import the custom hook

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = {
        email: "",
        password: ""
    };

    const { values, errors, handleChange, validateForm } = useFormValidation(initialState);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            toast.error('Please correct the errors in the form');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values), // Sending the values object as JSON
                credentials: 'include' // This ensures cookies like JWT are included in the request
            });

            const data = await response.json(); // Parse JSON response
            
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token",JSON.stringify(data.token));
                dispatch(setAuthUser(data.user));
                toast.success(data.message);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Network or server error", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">Login to <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">CodeWarrior</span> </h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your email address"
                            required
                            onChange={handleChange}
                            value={values.email}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your password"
                            required
                            onChange={handleChange}
                            value={values.password}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        <button
                            type="button"
                            className="absolute inset-y-6 right-0 px-3 py-2"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center mt-4">
                    <span className="text-gray-600">Don't have an account?</span>{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
