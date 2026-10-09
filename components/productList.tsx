"use client";

import {priceFormatter} from "@/lib/api";
import type { Product } from "@/types/product";
import { addToCart } from "@/features/cart/cartSlice";
import { selectCartItemsCount } from "@/features/cart/cartSelectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector(selectCartItemsCount);

  return (
    <div>
      <h2>Products</h2>
      <p>
        <Link href="/cart">View cart ({cartItemsCount})</Link>
      </p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: {priceFormatter.format(product.price)}</p>
            <button
              type="button"
              onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}