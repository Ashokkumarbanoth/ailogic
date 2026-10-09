"use client";

interface ProductErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: ProductErrorProps) {
  console.error("Product page error:", error);

  return (
    <main>
      <h2>Unable to load this product.</h2>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}