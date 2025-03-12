import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_URL_IMAGE } from "../constants/API_URL";
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../context/AuthContext";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addedQuantity, setAddedQuantity] = useState(1);
  const { user, token } = useAuth();
  

  const formData = (date) => format(new Date(date), "PPpp");

  // ✅ Fix: Correct quantity increment and prevent going below 1
  const handleAddQuantity = () => {
    setAddedQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setAddedQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/product/byId/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error occurred", error);
      }
    };
    getSingleProduct();
  }, [id]);

  // ✅ Fix: Corrected API call and included quantity properly
  const addToCart = async () => {
    try {
      await axios.post(
        `${API_URL}/carts/add`,
        {
          userId: user._id,
          productId: product._id,
          quantity: addedQuantity, // ✅ Send correct quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Added to cart")
      console.log("Added to cart");
    } catch (error) {
      toast.error("Error occurred", error);
    }
  };

  return (
    <div className="container mx-auto p-10 mt-10">
      {product ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <img
              src={`${API_URL_IMAGE}/${product.image}`}
              alt={product.name}
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col space-y-3">
            <h1 className="text-2xl font-bold text-gray-500">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <span className="text-green-300">
              <span className="bg-gray-700 text-gray-500 underline p-1 rounded">
                Brand
              </span>{" "}
              {product.brand}
            </span>
            <span className="text-gray-400">
              <span className="text-orange-500"> 24 Items left </span> out of{" "}
              {product.stock}
            </span>
            <span className="text-green-600">
              <span className="text-gray-600">Published </span>{" "}
              {formData(product.updatedAt)}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-800 text-white rounded-md"
              >
                -
              </button>
              <span className="text-xl font-semibold text-gray-200">{addedQuantity}</span>
              <button
                onClick={handleAddQuantity}
                className="px-3 py-1 bg-gray-800 text-white rounded-md"
              >
                +
              </button>
            </div>
            <span className="text-xl font-semibold">
              <span className="text-red-500 line-through">${product.price}</span>
              <span className="text-green-800 ml-2">
                Reduce: ${product.price - 2}
              </span>
            </span>
            <button
              onClick={addToCart}
              className="border border-gray-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>

            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-center">No Product Found</div>
      )}
    </div>
  );
}

export default SingleProduct;
