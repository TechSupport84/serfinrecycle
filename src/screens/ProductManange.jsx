import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_URL } from "../constants/API_URL";
import { toast, ToastContainer } from "react-toastify";

function ProductManage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [storedImageURLs, setStoredImageURLs] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleUploadImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setError("You can only upload up to 3 images.");
      return;
    }
    setImages(files);
    setError("");
  };

  useEffect(() => {
    const fetchStoredImages = async () => {
      try {
        const response = await axios.get(`${API_URL}/product/images`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStoredImageURLs(response.data.map(img => `${API_URL}/uploads/${img}`));
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchStoredImages();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !brand || !stock || images.length === 0) {
      setError("All fields are required, including images.");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("price", price);
    formData.append("brand", brand.trim());
    formData.append("stock", stock);
    images.forEach((image) => formData.append("images", image));  // Fixed key name

    try {
      await axios.post(`${API_URL}/product/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setBrand("");
      setStock("");
      setImages([]);
      setError("");
    } catch (error) {
      setError("Error adding product! Please try again: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Product Management</h1>
      <div className="mt-5">
        <h2 className="text-xl text-gray-700">Add Product</h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mt-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <input
            type="text"
            value={name}
            placeholder="Product Name"
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            value={description}
            placeholder="Product Description"
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            value={price}
            placeholder="Product Price"
            required
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            value={brand}
            placeholder="Product Brand"
            required
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            value={stock}
            placeholder="Product Stock"
            required
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            required
            onChange={handleUploadImages}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Add Product
          </button>
        </form>

        {storedImageURLs.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-3">
            {storedImageURLs.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Stored Image ${index + 1}`}
                className="border rounded-lg shadow-md w-full h-24 object-cover"
              />
            ))}
          </div>
        )}
        
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default ProductManage;
