"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard, { Product } from "@/app/components/ProductCard/ProductCard";
import styles from "./style/ProductDetail.module.css";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <p className={styles.loading}>Loading product...</p>;
  if (!product) return <p className={styles.error}>Product not found</p>;

  return (
    <div className={styles.container}>
      <ProductCard product={product} />
    </div>
  );
}
