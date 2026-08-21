'use client'
import Link from 'next/link'
import React from 'react'

import { useRouter } from 'next/navigation';
import {useAuth} from '../../context/authcontext.jsx';

const NavBar = () => {
  const { user,  logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
           <Link href="/" className="text-white text-lg font-bold">MyApp</Link>
            <div>
                <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded">Dashboard</Link>
                {user?.role === 'admin' && (
                    <Link href="/addproduct" className="text-gray-300 hover:text-white px-3 py-2 rounded">Add Product</Link>
                )}
                {user ? (
                    <>
                        <span className="text-gray-300 px-3 py-2 rounded">Hello, {user.name}</span>
                         <span className="text-gray-300 px-3 py-2 rounded">Role: {user.role}</span>
                        <button
                            onClick={handleLogout}
                            className="text-gray-300 hover:text-white px-3 py-2 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded">Login</Link>
                        <Link href="/register" className="text-gray-300 hover:text-white px-3 py-2 rounded">Register</Link>
                    </>
                )}
            </div>
        </div>
    </nav>
    
    
    
    </>
  )
}

export default NavBar
    