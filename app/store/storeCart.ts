import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../components/ProductCard/ProductCard'; 
interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  isOpen: boolean; 
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void; 
  totalPrice: () => number; // פונקציה לחישוב סה"כ
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,

      // מוסיף מוצר לסל
      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find((p) => p.id === product.id);
          const newCart = exists
            ? state.cart.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: p.quantity + 1 }
                  : p
              )
            : [...state.cart, { ...product, quantity: 1 }];

          return { cart: newCart, isOpen: true };
        }),

      // מסיר מוצר מהסל
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== productId),
        })),

      // מעדכן כמות פריט
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === productId ? { ...p, quantity } : p
          ),
        })),

      // רוקן את הסל
      clearCart: () => set({ cart: [] }),

      // פותח/סוגר את הסיידבר
      toggleCart: (open) => set({ isOpen: open ?? !get().isOpen }),

      // פונקציה לחישוב סך הכל
      totalPrice: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
);
