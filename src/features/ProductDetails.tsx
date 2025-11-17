import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description?: string;
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ color: "#555" }}>Loading...</p>;
  if (error) return <p style={{ color: "#e74c3c" }}>{error}</p>;
  if (!product) return <p style={{ color: "#555" }}>No product found</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Link
        to="/"
        style={{
          color: "#0070f3",
          fontWeight: "bold",
          marginBottom: "20px",
          display: "inline-block",
        }}
      >
        &larr; Back to Products
      </Link>

      <div
        style={{
          border: "1px solid #e0e0e0",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9ff",
        }}
      >
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            marginBottom: "15px",
            color: "#1e1e50",
          }}
        >
          {product.name}
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          Price:{" "}
          <span style={{ color: "#0070f3", fontWeight: "bold" }}>
            ₹{product.price}
          </span>
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          Category: {product.category}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          Stock:{" "}
          <span
            style={{
              color: product.inStock ? "#2ecc71" : "#e74c3c",
              fontWeight: "bold",
            }}
          >
            {product.inStock ? "Available" : "Out of stock"}
          </span>
        </p>
        {product.description && (
          <p style={{ fontSize: "16px", marginTop: "10px", color: "#444" }}>
            Description: {product.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
