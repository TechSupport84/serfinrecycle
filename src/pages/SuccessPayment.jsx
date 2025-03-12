import React from "react";
import { useNavigate } from "react-router-dom";

function SuccessPayment() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full animate-fade-in">
        {/* Success Checkmark */}
        <div className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-green-500">Payment Successful!</h2>
        <p className="mt-4 text-gray-300">
          Your order has been confirmed. You will receive a confirmation email shortly.
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

export default SuccessPayment;
