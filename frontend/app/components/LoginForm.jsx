'use client'
import React from 'react'
import { useState } from 'react';
import api from '../../lib/api.js';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authcontext.jsx';
const LoginForm = () => {
    const router = useRouter();
    const { setUser } = useAuth();

    const [formData, setFormData] =useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', formData);
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user info in localStorage
            setUser(response.data.user); // Update user state in context
            console.log('Login successful:', response.data);
            router.push('/dashboard'); // Redirect to dashboard on successful login
        } catch (error) {
            console.error('Login failed:', error);
            setError(
                error.response?.data?.message ||
                'Unable to connect to the server. Please make sure the API is running.'
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
                {error && <p className="text-red-500">{error}</p>}
                <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>    
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            Login
                        </button>
                    </div>
                </form>
                    <div className="text-sm text-center">
                        Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register here</a>
                    </div>
            </div>
        </div>
    </>
  )
}

export default LoginForm
    
    
    
   
