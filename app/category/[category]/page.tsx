"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard, { Product } from "@/app/components/ProductCard/ProductCard";
import styles from "./CategoryPage.module.css";
import { fetchProductsByCategory } from "../../api/product"; 


export default function CategoryPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = Array.isArray(params.category)
    ? decodeURIComponent(params.category[0])
    : decodeURIComponent(params.category || "");

  useEffect(() => {
    if (!category) return;

    const loadProducts = async () => {
      try {
        const data = await fetchProductsByCategory(category); 
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{category}</h1>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
