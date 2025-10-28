"use client";

import Link from "next/link";
import { useCartStore } from '../../store/storeCart';
import styles from './ProductCard.module.css';
import { useWishlistStore } from "@/app/store/wishlistStore";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  return (
    <div className={styles.card}>
      <Link href={`/product/${product.id}`} className={styles.link}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <h3>{product.title}</h3>
      </Link>

      <p className={styles.price}>${product.price}</p>
         <button className={styles.button} onClick={() => addToCart(product)}>Add to Cart</button>
      <button  onClick={() => addToWishlist(product)}> ❤️</button>
    </div>
  );
}
