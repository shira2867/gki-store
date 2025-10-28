'use client';

import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList/ProductList';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <main>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Latest Products</h1>
      <ProductList url="https://fakestoreapi.com/products" />
    </main>
  );
}
