import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartState, CartItem } from "@/types/cart";

const initialState: CartState = { cart: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.product.id !== action.payload);
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
