'use client';
import Link from 'next/link';
import { useCartStore } from '../../store/storeCart';

import styles from './Header.module.css';

export default function Header() {
    const cart = useCartStore((state) => state.cart);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">GKI Shop</Link>
            </div>
            <nav className={styles.nav}>
                <Link href="/home">Home</Link>
                <Link href="/category/men's clothing">Men</Link>
                <Link href="/category/women's clothing">Women</Link>
                <Link href="/category/jewelery">Jewelery</Link>
                <Link href="/category/electronics">Electronics</Link>
                <Link href="/wishlist">Wishlist</Link>

                <Link href="/checkout">
                    Cart ({cart.length})
                </Link>
            </nav>
        </header>
    );
}
