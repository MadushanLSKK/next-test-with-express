'use client'
import React from 'react'
import { useAuth } from '../../context/authcontext.jsx';



const ProductCard = ({  name, description, price , image , id , handleDelete , handleEditClick}) => {
  const { user } = useAuth();

  

  return (
   <>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={image} alt="Product Image" />
        <div className="px-6 py-4">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-gray-600">{description}</p>
            <p className="text-xl font-bold">${price.toFixed(2)}</p>
        </div>
        {user?.role === 'admin' &&  (
        <div className="px-6 py-4 flex justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>handleEditClick({id , name, description, price, image})}>Update</button>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(id)}
              >
                Delete
            </button>
        </div>
        ) }

        {user?.role === 'user' && (
          <div className="px-6 py-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
          </div>
        )}

    </div>
   </>
  )
}

export default ProductCard