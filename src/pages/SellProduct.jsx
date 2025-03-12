import React, { useState } from "react";

const SellProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

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
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Sell Your Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          rows="3"
          className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price ($)"
          className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home_appliances">Home Appliances</option>
          <option value="other">Other</option>
        </select>

        {/* Image Upload */}
        <div className="flex items-center space-x-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 cursor-pointer"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
          )}
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
