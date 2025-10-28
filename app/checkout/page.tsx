'use client';
import { useCartStore } from '../store/storeCart';
import s from "./checkout.module.css";

export default function CheckoutPage() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  if (!cart.length) return <p>Your cart is empty.</p>;

  const totalPrice = cart.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);

  return (
    <section className={s.container}>
      {cart.map((product) => (
        <div key={product.id} className={s.item}>
          <img src={product.image} alt={product.title} width={60} height={60} />
          <div className={s.grow}>
            <h4>{product.title}</h4>
            <p>
              ${product.price.toFixed(2)} × {product.quantity || 1} = ${(product.price * (product.quantity || 1)).toFixed(2)}
            </p>
          </div>
          <div className={s.controls}>
            <button className={s.btn} onClick={() => updateQuantity(product.id, (product.quantity || 1) - 1)}>➖</button>
            <button className={s.btn} onClick={() => updateQuantity(product.id, (product.quantity || 1) + 1)}>➕</button>
            <button className={s.btn} onClick={() => removeFromCart(product.id)}>🗑️</button>
          </div>
        </div>
      ))}
      <hr />
      <p className={s.total}>Total: ${totalPrice.toFixed(2)}</p>
      <div className={s.actions}>
        <button className={s.btn} onClick={clearCart}>Clear Cart</button>
      </div>
    </section>
  );
}
