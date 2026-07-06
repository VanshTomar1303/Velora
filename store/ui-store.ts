import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isLoading: true,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
