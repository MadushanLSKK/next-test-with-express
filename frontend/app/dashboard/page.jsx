'use client'
import React from 'react'
import ProductCard from '../components/ProductCard.jsx';
import { useState, useEffect } from 'react';
import api from '../../lib/api.js';

const page = () => {

  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();

  }, []);

  const handleEditClick = (product) => {
  setSelectedProduct(product);
  setIsOpen(true);
  };

 const handleDelete = async (id) => {
  try {
    await api.delete(`/products/${id}`);

    setProducts((prev) =>
      prev.filter((product) => product._id !== id)
    );

  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
  }
};

 const handleUpdate = async () => {
  try {
    const { id, name, price, image } = selectedProduct;

    const res = await api.put(`/products/${id}`, {
      name,
      price,
      image,
    });

    setProducts((prev) =>
      prev.map((p) => (p._id === id ? res.data : p))
    );

    setIsOpen(false);

  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
  }
};

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              id={product._id}
              handleDelete={handleDelete}
              handleEditClick={handleEditClick}
            />
          ))}
        </div>
      </div>


      {isOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-96">

              <h2 className="text-xl font-bold mb-4">Update Product</h2>

              <input
                className="border p-2 w-full mb-2"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
                placeholder="Name"
              />

              <input
                className="border p-2 w-full mb-2"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, price: e.target.value })
                }
                placeholder="Price"
              />

              <input
                className="border p-2 w-full mb-4"
                value={selectedProduct.image}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, image: e.target.value })
                }
                placeholder="Image URL"
              />

              <div className="flex justify-between">
                <button
                  className="bg-gray-500 text-white px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className="bg-green-500 text-white px-4 py-2"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>

            </div>
          </div>
)}
    </>
  )
}

export default page