import  {createSelector} from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export const selectCart = (state: RootState) => state.cart.cart;

export const selectCartItemsCount = createSelector(
  [selectCart],
  (cart) => cart.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  [selectCart],
  (cart) => cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
);  
