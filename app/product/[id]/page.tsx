import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProducts, priceFormatter } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isSafeInteger(productId)) {
    notFound();
  }

  const products = await fetchProducts();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: {priceFormatter.format(product.price)}</p>
      <Link href="/products">Back to products</Link>
    </main>
  );
}