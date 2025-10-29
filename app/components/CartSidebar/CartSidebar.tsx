'use client';
import { useCartStore } from '../../store/storeCart';
import styles from './CartSidebar.module.css';
import Link from 'next/link';


export default function CartSidebar() {
  const { cart, isOpen, toggleCart, updateQuantity, clearCart } = useCartStore();

  if (!isOpen) return null; 
  const totalPrice = cart.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleCart(false)} />

      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2>🛒 הסל שלך</h2>
          <button className={styles.closeBtn} onClick={() => toggleCart(false)}>✖</button>
        </div>

        {cart.length === 0 ? (
          <p className={styles.empty}>הסל שלך ריק</p>
        ) : (
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <div className={styles.info}>
                  <p>{item.title}</p>
                  <p>{item.price} ₪</p>
                  <div className={styles.controls}>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} disabled={(item.quantity || 1) <= 1}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className={styles.footer}>
            <p className={styles.total}>סה"כ: {totalPrice} ₪</p>
            <Link href="/checkout" className={styles.checkoutBtn}>CHECKOUT</Link>
          </div>
        )}
      </div>
    </>
  );
}
