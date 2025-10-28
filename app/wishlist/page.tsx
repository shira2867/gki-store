'use client';

import { useWishlistStore } from "@/app/store/wishlistStore";
import Link from "next/link";
import styles from "./Wishlist.module.css";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>❤️ Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className={styles.empty}>אין מוצרים ברשימת המשאלות שלך.</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((item) => (
            <div key={item.id} className={styles.card}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <h3 className={styles.name}>{item.title}</h3>
              <p className={styles.price}>${item.price}</p>

              <div className={styles.actions}>
                <Link href={`/product/${item.id}`} className={styles.viewBtn}>
                  צפייה
                </Link>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromWishlist(item.id)}
                >
                  הסרה
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
