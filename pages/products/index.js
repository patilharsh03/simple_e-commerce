import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
          🛒 Explore Our Best Products
        </h1>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>

        {/* Product Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200"
            >
              <div className="overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-lg font-bold text-blue-600">
                  ₹{product.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Click to view more details
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
