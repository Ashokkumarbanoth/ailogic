"use client";

import {useEffect, useRef, type ReactNode} from "react";
import {Provider} from "react-redux";
import {makeStore} from "./index";
import type { AuthState } from "@/types/auth";
import type { CartItem } from "@/types/cart";
import { setCart } from "@/features/cart/cartSlice";

const CART_STORAGE_KEY = "ailogic-cart";

function isCartItem(value: unknown): value is CartItem {
    if (typeof value !== "object" || value === null) return false;

    const item = value as Record<string, unknown>;
    if (!Number.isInteger(item.quantity) || (item.quantity as number) < 1) return false;
    if (typeof item.product !== "object" || item.product === null) return false;

    const product = item.product as Record<string, unknown>;
    return (
        typeof product.id === "number" &&
        typeof product.title === "string" &&
        typeof product.description === "string" &&
        typeof product.price === "number" &&
        typeof product.discountPercentage === "number" &&
        typeof product.rating === "number" &&
        typeof product.stock === "number" &&
        typeof product.brand === "string" &&
        typeof product.category === "string" &&
        typeof product.thumbnail === "string" &&
        Array.isArray(product.images) &&
        product.images.every((image) => typeof image === "string")
    );
}

interface props {
    children: ReactNode;
    initialAuth: AuthState;
}

export default function StoreProvider({children, initialAuth}: props) {
    const storeRef = useRef(makeStore({auth: initialAuth}));

    useEffect(() => {
        const store = storeRef.current;

        try {
            const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart !== null) {
                const parsed: unknown = JSON.parse(savedCart);
                if (Array.isArray(parsed) && parsed.every(isCartItem)) {
                    store.dispatch(setCart(parsed));
                } else {
                    console.error("Saved cart data has an invalid format.");
                }
            }
        } catch (error) {
            console.error("Unable to load the saved cart.", error);
        }

        const unsubscribe = store.subscribe(() => {
            try {
                window.localStorage.setItem(
                    CART_STORAGE_KEY,
                    JSON.stringify(store.getState().cart.cart),
                );
            } catch (error) {
                console.error("Unable to save the cart.", error);
            }
        });

        return unsubscribe;
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}