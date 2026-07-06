import type { CartLine, Coupon } from "@/types/cart";
import { mockFetch } from "./client";

const COUPONS: Coupon[] = [
  { code: "VELORA10", percentOff: 10 },
  { code: "WELCOME15", percentOff: 15 },
];

export async function validateCoupon(code: string): Promise<Coupon | null> {
  const found = COUPONS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
  return mockFetch(found ?? null, 500);
}

export interface OrderSummaryInput {
  lines: CartLine[];
  taxRate: number;
  deliveryFee: number;
  coupon: Coupon | null;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export function calculateOrderSummary({
  lines,
  taxRate,
  deliveryFee,
  coupon,
}: OrderSummaryInput): OrderSummary {
  const subtotal = lines.reduce((sum, l) => sum + l.item.price * l.quantity, 0);
  const discount = coupon ? subtotal * (coupon.percentOff / 100) : 0;
  const taxable = subtotal - discount;
  const tax = taxable > 0 ? taxable * taxRate : 0;
  const delivery = lines.length > 0 ? deliveryFee : 0;
  const total = Math.max(0, taxable + tax + delivery);
  return { subtotal, discount, tax, delivery, total };
}

export interface OrderResult {
  id: string;
  placedAt: string;
  summary: OrderSummary;
}

/** Placeholder for a future POST /api/orders → Stripe/Razorpay/PayPal/Square checkout session. */
export async function placeOrder(input: OrderSummaryInput): Promise<OrderResult> {
  const summary = calculateOrderSummary(input);
  return mockFetch(
    {
      id: `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      placedAt: new Date().toISOString(),
      summary,
    },
    1000
  );
}
