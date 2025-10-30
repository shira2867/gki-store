"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard, { Product } from "@/app/components/ProductCard/ProductCard";
import styles from "./style/ProductDetail.module.css";
import {  fetchProductById} from "../../api/product"; 


export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

    const id = Number(params.id);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading product...</p>;
  if (!product) return <p className={styles.error}>Product not found</p>;

  return (
    <div className={styles.container}>
      <ProductCard product={product} />
    </div>
  );
}
