import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Product type
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description?: string;
};

// API response type
type ListResponse<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
};

// Product Card
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <div
        tabIndex={0}
        style={{
          border: "1px solid #e0e0e0",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "16px",
          backgroundColor: "#f9f9ff",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "220px", // all cards same height
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          target.style.transform = "translateY(-4px)";
          target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.transform = "translateY(0)";
          target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
        onFocus={(e) => {
          const target = e.currentTarget;
          target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
        }}
        onBlur={(e) => {
          const target = e.currentTarget;
          target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#1e1e50",
            }}
          >
            {product.name}
          </h3>
          <p
            style={{ fontSize: "16px", color: "#3a3a3a", marginBottom: "6px" }}
          >
            Price:{" "}
            <span style={{ color: "#0070f3", fontWeight: "bold" }}>
              ₹{product.price}
            </span>
          </p>
          <p style={{ fontSize: "14px", color: "#555", marginBottom: "6px" }}>
            Category: {product.category}
          </p>
          <p style={{ fontSize: "14px", marginBottom: "6px" }}>
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
          <p style={{ fontSize: "14px", color: "#444", minHeight: "40px" }}>
            {product.description ? `Description: ${product.description}` : " "}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Main Products Page
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [sort, setSort] = useState("name-asc");
  const limit = 8;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      query.append("page", page.toString());
      query.append("limit", limit.toString());
      if (search) query.append("query", search);
      if (category !== "All") query.append("category", category);
      if (stock !== "All") query.append("stock", stock);
      query.append("sort", sort);

      const res = await fetch(`/products?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: ListResponse<Product> = await res.json();
      setProducts(data.items);
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category, stock, sort]);

  const categories = ["All", "Electronics", "Home", "Clothing", "Books"];
  const stocks = ["All", "Available", "Out of stock"];
  const sorts = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
    { value: "stock-asc", label: "Stock (Out → Available)" },
    { value: "stock-desc", label: "Stock (Available → Out)" },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#1e1e50",
        }}
      >
        Products
      </h1>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
          style={{
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: 1,
            minWidth: "200px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          style={{
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minWidth: "150px",
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          aria-label="Filter by stock status"
          style={{
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minWidth: "150px",
          }}
        >
          {stocks.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
          style={{
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minWidth: "150px",
          }}
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading / Error / Empty */}
      {loading && <p style={{ fontSize: "16px", color: "#555" }}>Loading...</p>}
      {error && <p style={{ color: "#e74c3c", fontSize: "16px" }}>{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p style={{ fontSize: "16px", color: "#555" }}>No products found.</p>
      )}

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          gap: "16px",
        }}
      >
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          aria-label="Previous page"
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            backgroundColor: "#0070f3",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            cursor: page <= 1 ? "not-allowed" : "pointer",
            opacity: page <= 1 ? 0.5 : 1,
          }}
        >
          Prev
        </button>
        <span
          style={{ padding: "10px 16px", fontWeight: "bold", color: "#333" }}
        >
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          aria-label="Next page"
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            backgroundColor: "#0070f3",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            cursor: page >= totalPages ? "not-allowed" : "pointer",
            opacity: page >= totalPages ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
