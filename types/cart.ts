import type { MenuItem } from "./menu";

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

export interface Coupon {
  code: string;
  percentOff: number;
}
