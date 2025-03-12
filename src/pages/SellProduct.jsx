import React, { useState, useEffect } from "react";
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { dataChart } from "../constants/data";

const SellProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [chartWidth, setChartWidth] = useState(600);

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
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Details:", product);
    alert("Product Listed Successfully!");
    setProduct({
      title: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-4">
        Sell Your Product
      </h2>
      <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
        Sell your brand and pre-owned products with ease. Turn unused items into valuable assets and embrace sustainability. It's time to give them a second life!
      </p>

      {/* Responsive Chart */}
      <div className="flex flex-col items-center justify-center w-full">
        <ScatterChart
          width={chartWidth}
          height={300}
          series={[
            { label: 'Sell A', data: dataChart.map((v) => ({ x: v.x1, y: v.y1, id: v.id })) },
            { label: 'Earn B', data: dataChart.map((v) => ({ x: v.x1, y: v.y2, id: v.id })) },
          ]}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <input
          type="text"
          name="title"
          value={product.title}
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
          name="price"
          value={product.price}
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
          <option value="home_appliances">Home Appliances</option>
          <option value="other">Other</option>
        </select>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full sm:w-2/3 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 cursor-pointer"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
          )}
        </div>

        {/* Policies Section */}
        <div className="max-w-2xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Product Quality & Policies</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            All products should be in good condition, fully functional, and honestly described.
          </p>

          <h3 className="text-lg font-semibold mt-4">Selling Guidelines</h3>
          <ul className="list-disc pl-6 text-gray-300 text-sm space-y-2">
            <li><strong className="text-white">Authenticity:</strong> Must be genuine and legally owned.</li>
            <li><strong className="text-white">Condition Transparency:</strong> Clearly state if the item is new, used, or refurbished.</li>
            <li><strong className="text-white">No Counterfeit Items:</strong> Fake or restricted products are not allowed.</li>
            <li><strong className="text-white">Fair Pricing:</strong> Prices should reflect the item's market value.</li>
            <li><strong className="text-white">Secure Transactions:</strong> Use verified payment methods.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">Discount & Acceptance</h3>
          <ul className="list-disc pl-6 text-gray-300 text-sm space-y-2">
            <li>Items must be <span className="text-green-400">clean, functional, and undamaged</span>.</li>
            <li><span className="text-yellow-400">Minor wear items</span> may be discounted by 25%.</li>
          </ul>

          <p className="mt-4 text-gray-300 text-sm">
            By listing your products, you agree to these policies for a safe marketplace.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          List Product
        </button>
      </form>
    </div>
  );
};

export default SellProduct;
