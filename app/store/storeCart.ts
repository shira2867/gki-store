import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../components/ProductCard/ProductCard';

interface CartState {
  cart: Product[];
  isOpen: boolean; 
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void; 
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false, 
      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find((p) => p.id === product.id);
          const newCart = exists
            ? state.cart.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: (p.quantity || 1) + 1 }
                  : p
              )
            : [...state.cart, { ...product, quantity: 1 }];

          return { cart: newCart, isOpen: true }; 
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
      toggleCart: (open) => set({ isOpen: open ?? !get().isOpen }),
    }),
    { name: 'cart-storage' }
  )
);
