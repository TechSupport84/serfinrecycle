import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeItem } from "../features/CartSlices";
import { API_URL_IMAGE, API_URL } from "../constants/API_URL";
import { useAuth } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log("Cart Items:", cartItems);

  // Group cart items by product _id to avoid duplicates
  const groupedCart = cartItems.reduce((acc, item) => {
    if (!acc[item._id]) {
      acc[item._id] = { ...item };
    } else {
      acc[item._id].quantity += item.quantity;
    }
    return acc;
  }, {});

  const uniqueCartItems = Object.values(groupedCart);

  // Calculate total price
  const calculateTotalPrice = () => {
    return uniqueCartItems
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const totalPrice = parseFloat(calculateTotalPrice());

  const makePayment = async () => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
  
    setLoading(true);
    try {
      const stripe = await loadStripe("pk_test_51Qayd5GvGvEptgkcgbOsggAkr3Kn3xESkFI7dIEsLpzUaSDLQQEB2oDx5WcI5v24cXI7VMI4g7vosBjsCPFTl3Fz00fJWnmayL");
  
      // Ensure images are properly formatted (convert array to string if necessary)
      const formattedProducts = cartItems.map(item => ({
        name: item.name,
        image: Array.isArray(item.image) ? item.image[0] : item.image,  // Ensure it's a string
        price: item.price,
        quantity: item.quantity
      }));
  
      const response = await fetch(`${API_URL}/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ products: formattedProducts })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText}`);
      }
  
      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Payment failed:", error.message);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto mt-20 p-4 md:p-6 shadow-lg rounded-lg bg-gray-800 text-white">
  <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Shopping Cart</h2>

  {uniqueCartItems.length === 0 ? (
    <p className="text-center text-gray-300">Your cart is empty.</p>
  ) : (
    uniqueCartItems.map((item) => (
      <div key={item._id} className="mb-6 p-4 border border-gray-600 rounded-lg bg-gray-700">
        <div className="flex flex-wrap items-center mb-4">
          <img
            src={`${API_URL_IMAGE}/${item.image[0]}`}
            alt={item.name}
            className="w-full md:w-24 h-24 object-cover rounded mb-3 md:mb-0 mr-0 md:mr-4"
          />
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.description}</p>
            <p className="text-sm">Brand: {item.brand}</p>
            <p className="text-sm">Category: {item.category}</p>
            <p className="text-sm">Price: ${item.price}</p>
            <p className="text-sm">Stock: {item.stock}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center">
          <p className="text-lg">Quantity: {item.quantity}</p>
          <p className="text-lg font-bold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
          <div className="flex space-x-3 w-full md:w-auto">
            <button
              onClick={() => dispatch(decreaseQuantity(item._id))}
              className="bg-red-500 text-white px-3 py-1 rounded w-full md:w-auto"
              disabled={loading}
            >
              -
            </button>
            <button
              onClick={() => dispatch(increaseQuantity(item._id))}
              className="bg-green-500 text-white px-3 py-1 rounded w-full md:w-auto"
              disabled={loading}
            >
              +
            </button>
            <BiTrash
              className="text-red-400 cursor-pointer hover:text-red-500"
              size={20}
              onClick={() => dispatch(removeItem(item._id))}
            />
          </div>
        </div>
      </div>
    ))
  )}

  <button
    onClick={makePayment}
    className="mt-5 w-full bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
    disabled={loading}
  >
    {loading ? "Processing..." : `Pay Now ($${totalPrice})`}
  </button>

  <ToastContainer />
</div>

  );
};

export default CartPage;
