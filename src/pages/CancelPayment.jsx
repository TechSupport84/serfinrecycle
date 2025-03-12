import React from "react";
import { useNavigate } from "react-router-dom";

function CancelPayment() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-red-500">Payment Canceled 😞</h2>
        <p className="mt-4 text-gray-300">
          Your payment was not completed. If this was a mistake, you can try again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default CancelPayment;
