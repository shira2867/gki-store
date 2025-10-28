import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../components/ProductCard/ProductCard';

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find((p) => p.id === product.id);
          if (exists) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === productId ? { ...p, quantity } : p
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart-storage' }
  )
);
