import React, { useEffect, useState } from 'react';
import { API_URL, API_URL_IMAGE } from '../constants/API_URL';
import axios from 'axios';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const {  token } = useAuth();
  const navitate  = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/product/products`);
        setProducts(data.products);
      } catch (error) {
        setError('Error occurred while fetching products',error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the state to remove the deleted product
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError('Error occurred while deleting product',error);
    }
  };

  return (
    <div className='max-w-4xl mx-auto mt-5 p-5 bg-white shadow-lg rounded-lg'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Product Management</h2>
      {error && <div className='bg-red-100 text-red-700 p-3 rounded-md mb-4'>{error}</div>}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {products.map((item) => (
          <div
            key={item._id}
            className='bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300'
          >
            <h3 className='text-lg font-medium text-gray-900'>{item.name}</h3>
            {Array.isArray(item.image) && item.image.length > 0 ? (
              <img
                src={`${API_URL_IMAGE}/${item.image[0]}`}
                alt={item.name}
                className='h-48 w-full object-cover rounded-md mt-2'
              />
            ) : (
              <p className='text-gray-500 text-center py-5'>No Image Available</p>
            )}
            <p className='text-gray-700 mt-2'>{item.description}</p>
            <div className='flex justify-between items-center mt-3'>
              <button onClick={()=>navitate(`/editProduct/${item._id}`)} className='text-blue-600 hover:text-blue-800 transition-all'>
                <BiEdit size={22} />
              </button>
              <button
                className='text-red-600 hover:text-red-800 transition-all'
                onClick={() => handleDelete(item._id)}
              >
                <BiTrashAlt size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManager;
