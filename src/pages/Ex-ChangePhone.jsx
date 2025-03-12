import React from "react";

const ExchangeProduct = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
        Exchange Your Product
      </h2>

      {/* Exchange Form */}
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          rows="3"
          placeholder="Product Description"
          className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500"
        ></textarea>
        <input
          type="file"
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 cursor-pointer"
        />
      </div>

      {/* Submit Button */}
      <button className="mt-6 w-full bg-orange-600 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition">
        Submit Exchange Request
      </button>
    </div>
  );
};

export default ExchangeProduct;
