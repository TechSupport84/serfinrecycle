import { useState, useEffect } from "react";
import { BiCart } from "react-icons/bi";
import { API_URL } from "../constants/API_URL";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const CartNumber = ({carts}) => {
    const [cart, setCart] = useState({ cart: [], totalAmount: 0 });
    const { user, token } = useAuth();

    useEffect(() => {
        if (!user || !user._id) return;

        const fetchCart = async () => {
            try {
                const response = await axios.get(`${API_URL}/carts/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setCart(response.data || { cart: [], totalAmount: 0 });
                console.log("CArts:",response.data)
            } catch (error) {
                console.error("Error fetching cart:", error);
                setCart({ cart: [], totalAmount: 0 }); // Ensure cart is always defined
            }
        };

        fetchCart();
    }, [user?._id, token, cart]);

    return (
        <div className="flex flex-row relative">
            <BiCart className="mr-5" size={24} />
                <span className="absolute bg-red-500 text-white p-1 rounded-full text-xs top-[-5px] right-0">
                    {carts}
                </span>
        </div>
    );
};

export default CartNumber;
