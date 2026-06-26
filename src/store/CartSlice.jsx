import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
