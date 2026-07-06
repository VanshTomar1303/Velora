"use client";

import { useMemo } from "react";
import { useCartStore } from "@/store/cart-store";
import { calculateOrderSummary } from "@/lib/api/orders";
import { getSettingsSync } from "@/lib/api/settings";

export function useCart() {
  const { lines, coupon, isOpen, addItem, removeItem, setQuantity, clear, applyCoupon, open, close, toggle } =
    useCartStore();

  const settings = getSettingsSync();

  const summary = useMemo(
    () =>
      calculateOrderSummary({
        lines,
        taxRate: settings.taxRate,
        deliveryFee: settings.deliveryFee,
        coupon,
      }),
    [lines, coupon, settings.taxRate, settings.deliveryFee]
  );

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return {
    lines,
    coupon,
    isOpen,
    itemCount,
    summary,
    addItem,
    removeItem,
    setQuantity,
    clear,
    applyCoupon,
    open,
    close,
    toggle,
  };
}
