import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubscribeAffiliate() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter a valid email address!");
      return;
    }
    toast.success("Subscription successful! 🎉");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      {/* Subscription Section */}
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-4">Subscribe & Earn Rewards</h1>
        <p className="text-gray-300 mb-6">
          Join our newsletter to stay updated & refer friends to earn commissions!
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <input
            type="email"
            placeholder="Enter your email..."
            className="p-3 w-full md:w-80 bg-gray-700 text-white rounded-lg focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold"
          >
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Free Plan", price: "$0", desc: "Basic updates & newsletters" },
          { name: "Premium Plan", price: "$9.99/mo", desc: "Exclusive content & special offers" },
          { name: "VIP Plan", price: "$19.99/mo", desc: "All-access & priority support" },
        ].map((plan, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-3">{plan.name}</h2>
            <p className="text-gray-400">{plan.desc}</p>
            <p className="text-3xl font-bold mt-4">{plan.price}</p>
            <button className="mt-4 px-5 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white">
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      {/* Affiliate Section */}
      <div className="w-full max-w-4xl mt-16 text-center">
        <h2 className="text-3xl font-bold">Join Our Affiliate Program</h2>
        <p className="text-gray-300 mt-2">
          Earn up to <span className="text-green-400 font-bold">30% commission</span> for every referral!
        </p>

        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-gray-300">
            Invite your friends & earn rewards when they subscribe.
          </p>
          <button className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-white">
            Join Now
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SubscribeAffiliate;
