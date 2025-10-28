"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard, { Product } from "@/app/components/ProductCard/ProductCard";
import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
  const params = useParams(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

const category = Array.isArray(params.category) 
  ? decodeURIComponent(params.category[0]) 
  : decodeURIComponent(params.category || "");
  useEffect(() => {
    if (category) {
      fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .finally(() => setLoading(false));
    }
  }, [category]);

  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products found in this category.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{category}</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
