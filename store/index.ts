import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import type{AuthState} from "@/types/auth";

export const makeStore = (preloadedState?: { auth: AuthState }) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            cart: cartReducer
        },
        preloadedState
    });
};

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];