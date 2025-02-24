import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { path } from '../utils/path'

const CategoryHeader = ({title, about}) => {
  return (
    <div className="relative bg-primary-color min-h-[12rem] w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Logo</h1>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-200 transition-colors font-medium">Home</Link>
            <Link to="/about" className="text-white hover:text-gray-200 transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-white hover:text-gray-200 transition-colors font-medium">Contact</Link>
          </nav>
        </div>

        <div className="mt-12 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight capitalize mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-gray-100 capitalize">{about}</p>
        </div>

        
      </div>
    </div>
  )
}

export default CategoryHeader