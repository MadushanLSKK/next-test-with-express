"use client"
import React from 'react'
import { useState } from 'react';
import api from '../../lib/api.js';
import { useRouter } from 'next/navigation';


const AddProductForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/products', formData);
            console.log('Product added:', res.data);
           
            setFormData({
                name: '',
                description: '',
                price: '',
                image: ''
            });
            router.push('/dashboard');
        } catch (error) {
           setError(error.response?.data?.message || 'An error occurred while adding the product');
            console.error('Error adding product:', error.response?.data || error.message);
            console.error('Error adding product:', error);
        }
    };

  return (
    <>
    
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>   
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Product Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Product Name" name='name' value={formData.name} onChange={handleChange}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" name='description' value={formData.description} onChange={handleChange}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Price
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" step="0.01" placeholder="Price" name='price' value={formData.price} onChange={handleChange}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    Image URL
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="text" placeholder="Image URL" name='image' value={formData.image} onChange={handleChange}/>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Add Product
                </button>
            </div>
        </form>
      </div>
    </>
  )
}

export default AddProductForm