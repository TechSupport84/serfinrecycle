import { createSlice } from "@reduxjs/toolkit";

// Function to update local storage
const updateLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Initial state, retrieving cart from localStorage if available
const initialState = {
  value: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlices = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const product = action.payload;
      const existingProduct = state.value.find(item => item._id === product._id); // Using _id

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      } else {
        state.value.push({ ...product, quantity: 1, totalPrice: product.price });
      }

      updateLocalStorage(state.value);
    },

    removeItem: (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload); // Using _id
      updateLocalStorage(state.value);
    },

    increaseQuantity: (state, action) => {
      const item = state.value.find(item => item._id === action.payload); // Using _id
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
      }

      updateLocalStorage(state.value);
    },

    decreaseQuantity: (state, action) => {
      const item = state.value.find(item => item._id === action.payload); // Using _id
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;
      }

      updateLocalStorage(state.value);
    },
  },
});

export const { addItems, removeItem, increaseQuantity, decreaseQuantity } = cartSlices.actions;
export default cartSlices.reducer;
