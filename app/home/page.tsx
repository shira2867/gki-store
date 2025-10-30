'use client';

import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList/ProductList';
import {  fetchAllProducts} from "../api/product"; 

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <main>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Latest Products</h1>
      <ProductList url="https://fakestoreapi.com/products" />
    </main>
  );
}
