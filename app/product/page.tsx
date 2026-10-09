import ProductList from "@/components/productList";
import { fetchProducts } from "@/lib/api";

export default async function ProductPage() {
    const products = await fetchProducts();
    return <ProductList products={products} />;
}