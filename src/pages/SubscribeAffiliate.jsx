import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../constants/API_URL";

const stripePromise = loadStripe("pk_test_51Qayd5GvGvEptgkcgbOsggAkr3Kn3xESkFI7dIEsLpzUaSDLQQEB2oDx5WcI5v24cXI7VMI4g7vosBjsCPFTl3Fz00fJWnmayL");

function SubscribeAffiliate() {
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribedPlan, setSubscribedPlan] = useState(null);
  const { token } = useAuth();

  // Fetch user subscription status on mount
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await axios.get(`${API_URL}/subscription-status/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.active) {
          setSubscribedPlan(response.data.plan);
        }
      } catch (error) {
        console.error("Error checking subscription status:", error);
      }
    };

    checkSubscription();
  }, [token]);

  // Handle Stripe Subscription
  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter a valid email address!");
      return;
    }
    if (!selectedPlan) {
      toast.error("Please select a subscription plan!");
      return;
    }
    if (subscribedPlan !== null) {
      toast.error("You are already subscribed to a plan.");
      return;
    }

    setIsSubscribing(true);

    try {
      const stripe = await stripePromise;

      const response = await axios.post(
        `${API_URL}/subscribe/`,
        { plan: selectedPlan, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const session = response.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) throw new Error(result.error.message);

      toast.success("Subscription initiated successfully! 🎉");
      setSubscribedPlan(selectedPlan);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Subscription failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubscribing(false);
    }
  };

  const subscriptionPlans = [
    { id: "free", name: "Free Plan", price: 4.99, desc: "Basic updates & newsletters" },
    { id: "premium", name: "Premium Plan", price: 9.99, desc: "Exclusive content & special offers" },
    { id: "vip", name: "VIP Plan", price: 19.99, desc: "All-access & priority support" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      {/* Subscription Section */}
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-4">Subscribe & Earn Rewards</h1>
        <p className="text-gray-300 mb-6">Join our newsletter to stay updated & refer friends to earn commissions!</p>

        <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <input
            type="email"
            placeholder="Enter your email..."
            className="p-3 w-full md:w-80 bg-gray-700 text-white rounded-lg focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubscribing || subscribedPlan !== null}
          />
          <button
            onClick={handleSubscribe}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              isSubscribing || subscribedPlan !== null
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isSubscribing || subscribedPlan !== null}
          >
            {isSubscribing ? "Subscribing..." : "Subscribe Now"}
          </button>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => {
              if (!isSubscribing && subscribedPlan === null) {
                setSelectedPlan(plan.id);
              }
            }}
            className={`p-6 rounded-lg shadow-lg text-center cursor-pointer transition ${
              selectedPlan === plan.id ? "bg-blue-700 border-2 border-blue-400" : "bg-gray-800"
            } ${subscribedPlan !== null ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <h2 className="text-2xl font-bold mb-3">{plan.name}</h2>
            <p className="text-gray-400">{plan.desc}</p>
            <p className="text-3xl font-bold mt-4">${plan.price}/mo</p>
            <button
              className={`mt-4 px-5 py-2 rounded-lg text-white transition ${
                selectedPlan === plan.id ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 hover:bg-gray-700"
              } ${subscribedPlan !== null ? "cursor-not-allowed bg-gray-500" : ""}`}
              disabled={subscribedPlan !== null || isSubscribing}
            >
              {subscribedPlan !== null ? "Subscribed" : selectedPlan === plan.id ? "Selected" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default SubscribeAffiliate;
