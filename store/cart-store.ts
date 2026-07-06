import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "@/types/menu";
import type { CartLine, Coupon } from "@/types/cart";

interface CartState {
  lines: CartLine[];
  coupon: Coupon | null;
  isOpen: boolean;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  applyCoupon: (coupon: Coupon | null) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      coupon: null,
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.lines.find((l) => l.item.id === item.id);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.item.id === item.id ? { ...l, quantity: l.quantity + 1 } : l
              ),
              isOpen: true,
            };
          }
          return { lines: [...state.lines, { item, quantity: 1 }], isOpen: true };
        }),
      removeItem: (id) =>
        set((state) => ({ lines: state.lines.filter((l) => l.item.id !== id) })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          lines: quantity <= 0
            ? state.lines.filter((l) => l.item.id !== id)
            : state.lines.map((l) => (l.item.id === id ? { ...l, quantity } : l)),
        })),
      clear: () => set({ lines: [], coupon: null }),
      applyCoupon: (coupon) => set({ coupon }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "velora-cart", skipHydration: true }
  )
);
