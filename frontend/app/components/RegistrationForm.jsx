'use client'
import React from 'react'
import { useState } from 'react';
import api from '../../lib/api.js';
import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
    const router = useRouter();
    const [formData, setFormData] =useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/auth/register', formData);
            console.log('Registration successful:', response.data);
            router.push('/login'); // Redirect to login page on successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            setError(
                error.response?.data?.message ||
                'Unable to connect to the server. Please make sure the API is running.'
            );
            
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
                {error && <p className="text-red-500">{error}</p>  }
                <h2 className="text-2xl font-bold text-center">Create Your Account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            id="name"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            id="email"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            id="password"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}



export default RegistrationForm
