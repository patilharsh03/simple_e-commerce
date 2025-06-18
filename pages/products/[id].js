import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((p) => p.id === id);
          setProduct(found);
        });
    }
  }, [id]);

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
        <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
        <p className="text-xl text-gray-700 mt-2">Price: ₹{product.price}</p>
        <p className="mt-4 text-gray-500">Product ID: {product.id}</p>
      </div>
    </div>
  );
}
