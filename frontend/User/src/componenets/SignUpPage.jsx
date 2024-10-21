import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import useFormValidation from '../hooks/useFormValidation'; // Import the custom hook

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { authUser } = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialState = {
        firstName: '',
        lastName:'',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const { values, errors, handleChange, validateForm } = useFormValidation(initialState);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please correct the errors in the form');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values), // Sending the form values
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem("token",JSON.stringify(data.token));
                toast.success(data.message);
                dispatch(setAuthUser(data.user));
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Network or server error', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
                <form method="POST" onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                            value={values.firstName}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter your first name"
                            required
                        />
                        {/* {errors.firstName && <p className="text-red-500 text-sm">{errors.name}</p>} */}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={handleChange}
                            value={values.lastName}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter your last name"
                            required
                        />
                        {/* {errors.lastName && <p className="text-red-500 text-sm">{errors.name}</p>} */}
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            value={values.username}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter your username"
                            required
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter your email address"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your password"
                                required
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
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={values.confirmPassword}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Confirm your password"
                                required
                            />
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
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600">
                            Sign Up
                        </button>
                    </div>
                    <div className="text-sm text-center text-gray-500">
                        Already have an account? <Link to="/login" className="text-blue-500">Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
