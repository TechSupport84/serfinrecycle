import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL, API_URL_IMAGE } from '../constants/API_URL';
import { useAuth } from '../context/AuthContext';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  // State for product details
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/product/byId/${id}`);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setBrand(data.product.brand);
        setStock(data.product.stock);
        setImages(data.product.image || []);
      } catch (error) {
        setError('Error fetching product details',error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create previews
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  // Handle Form Submission (Update Product)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('brand', brand);
      formData.append('stock', stock);
      images.forEach((image) => formData.append('image', image));

      await axios.put(`${API_URL}/product/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/products'); 
    } catch (error) {
      setError('Error updating product',error);
    }
  };

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Edit Product</h2>
      {error && <div className='bg-red-100 text-red-700 p-3 rounded-md mb-4'>{error}</div>}
      
      <form onSubmit={handleUpdate} className='space-y-4'>
        <div>
          <label className='block text-gray-700'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full border p-2 rounded'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full border p-2 rounded'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full border p-2 rounded'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700'>Brand</label>
          <input
            type='text'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className='w-full border p-2 rounded'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700'>Stock</label>
          <input
            type='number'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className='w-full border p-2 rounded'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700'>Images</label>
          <input type='file' multiple onChange={handleImageChange} className='w-full border p-2 rounded' />
          <div className='flex gap-2 mt-2'>
            {previews.length > 0
              ? previews.map((src, index) => (
                  <img key={index} src={src} alt='Preview' className='h-20 w-20 object-cover rounded-md' />
                ))
              : images.map((image, index) => (
                  <img
                    key={index}
                    src={`${API_URL_IMAGE}/${image}`}
                    alt='Existing'
                    className='h-20 w-20 object-cover rounded-md'
                  />
                ))}
          </div>
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
