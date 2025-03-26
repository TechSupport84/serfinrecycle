import React, { useState, useEffect } from "react";
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { dataChart } from "../constants/data";
import axios from "axios";
import { API_URL } from "../constants/API_URL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const SellProduct = () => {
  const { token } = useAuth();
  const [chartWidth, setChartWidth] = useState(600);
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    image: [],
    category: "",
    amount: "",
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const updateChartSize = () => {
      setChartWidth(window.innerWidth < 640 ? window.innerWidth - 40 : 600);
    };

    updateChartSize();
    window.addEventListener("resize", updateChartSize);
    
    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 3) {
      toast.error("You can upload a maximum of 3 images.");
      return;
    }

    setProduct((prev) => ({ ...prev, image: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));

    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.productName || !product.description || !product.category || !product.amount) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === "image") {
        product.image.forEach((image) => formData.append("image", image));
      } else {
        formData.append(key, product[key]);
      }
    });

    try {
      await axios.post(`${API_URL}/sell`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product Listed Successfully!");

      setProduct({
        productName: "",
        description: "",
        image: [],
        category: "",
        amount: "",
      });
      setImagePreviews([]);
    } catch (error) {
      console.error("Error listing product:", error);
      toast.error("Failed to list product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-4">Sell Your Product</h2>
      <p className="text-gray-400 text-sm md:text-base mb-6">Turn unused items into valuable assets and embrace sustainability.</p>
      
      <div className="flex flex-col items-center w-full">
        <ScatterChart
          width={chartWidth}
          height={300}
          series={[
            { label: 'Sell A', data: dataChart.map((v) => ({ x: v.x1, y: v.y1, id: v.id })) },
            { label: 'Earn B', data: dataChart.map((v) => ({ x: v.x1, y: v.y2, id: v.id })) },
          ]}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          rows="3"
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500"
          required
        />
        <input
          type="number"
          name="amount"
          value={product.amount}
          onChange={handleChange}
          placeholder="Price ($)"
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500"
          required
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="shoes">Shoes</option>
          <option value="others">Others</option>
        </select>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 cursor-pointer"
        />
        <div className="flex space-x-2">
          {imagePreviews.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded-lg" />
          ))}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          List Product
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SellProduct;