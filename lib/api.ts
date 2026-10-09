import { API_BASE_URL, AUTH_PATH, PRODUCTS_PATH } from "./constants";
import type { Product, ProductResponse } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}${PRODUCTS_PATH}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
  const data: ProductResponse = await response.json();
  return data.products;
}

export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
