'use client';
import { useEffect, useState } from 'react';
import ProductCard, { Product } from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

interface ProductListProps {
  url: string;
}

export default function ProductList({ url }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) return <p>Loading…</p>;

  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
