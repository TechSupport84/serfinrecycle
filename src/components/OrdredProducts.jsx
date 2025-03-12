import React, { useEffect, useState } from "react";
import { API_URL } from "../constants/API_URL";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { BiSolidTrash} from "react-icons/bi";
import { toast ,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderedProducts() {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data.orders);
        console.log("Orders:", response.data);
      } catch (error) {
        setError(`Error occurred: ${error.message}`);
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);



  const handleDeleteOrder = async (orderId) => {
    if (!orderId) {
      console.error("Order ID is undefined!");
      setError("Invalid Order ID.");
      return;
    }
  
    try {
      await axios.delete(`${API_URL}/orders/delete/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
   
      console.log(`Order ${orderId} deleted successfully`);
      toast.success("Order deleted successfully !")
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
     
    } catch (error) {
      console.error("Delete Error:", error);
      setError(`Error occurred while deleting order: ${error.response?.data?.message || error.message}`);
    }
  };
  
  return (
    <div className="p-6 bg-gray-800 min-h-screen mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Ordered Products</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-900 p-4 shadow-md rounded-lg border border-gray-600"
            >
              <h4 className="text-lg font-semibold text-gray-400">
                Order ID: {order._id}
              </h4>
              <p className="text-sm text-green-600">
                Tracking: {order.trackingNumber}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                Status: <span className="text-green-900">{order.status}</span>
              </p>
              <p className="text-sm text-orange-700">
                Estimated Delivery:{" "}
                {new Date(order.estimatedDelivery).toLocaleDateString()}
              </p>

              <h5 className="font-semibold mt-3 text-gray-300">Items:</h5>
              {order.items.map((item) => (
                <div key={item._id} className="bg-gray-300 p-3 mt-2 rounded-md">
                  <p className="text-sm text-gray-800 font-medium">
                    {item.productId?.name || "Unknown Product"}
                  </p>
                  <p className="text-sm text-gray-700">
                    Price: <span className="font-medium">${item.price}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Quantity: {item.quantity}
                  </p>
                </div>
              ))}

              <p className="text-sm  mt-3 border-b border-gray-600">
                <span className="font-medium text-green-500 ">Shipping  <span className="text-white">to:</span></span>{" "}
                <span className="text-blue-500">  {order.shippingAddress.city} </span>, <span className="text-blue-500"> {order.shippingAddress.country}</span>
              </p>

              <button onClick={()=> handleDeleteOrder(order._id)} className="hover:bg-gray-800 p-2 rounded"> <BiSolidTrash  size={30} className="text-red-800"/></button>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No orders found.</p>
      )}
    </div>
  );
}

export default OrderedProducts;
