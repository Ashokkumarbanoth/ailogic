"use client";

import Link from "next/link";
import { removeFromCart } from "@/features/cart/cartSlice";
import { selectCart, selectCartTotalPrice } from "@/features/cart/cartSelectors";
import { priceFormatter } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCart);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  if (items.length === 0) {
    return (
      <main>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/products">Browse products</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Your cart</h1>
      <ul>
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Quantity: {quantity}</p>
            <p>Price: {priceFormatter.format(product.price * quantity)}</p>
            <button
              type="button"
              onClick={() => dispatch(removeFromCart(product.id))}
              aria-label={`Remove ${product.title} from cart`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: {priceFormatter.format(totalPrice)}</p>
      <Link href="/products">Continue shopping</Link>
    </main>
  );
}
