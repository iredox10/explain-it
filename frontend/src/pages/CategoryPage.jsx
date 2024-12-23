import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const CategoryPage = () => {
    const {categoryId} = useParams()
    const {data,loading, error} = useFetch(``)
  return (
    <div>CategoryPage</div>
  )
}

export default CategoryPage