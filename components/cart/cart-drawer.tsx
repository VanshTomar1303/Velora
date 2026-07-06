"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Tag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/components/cart/cart-item";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { validateCoupon } from "@/lib/api/orders";
import { placeOrder } from "@/lib/api/orders";
import { getSettingsSync } from "@/lib/api/settings";

export function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useTranslations("cart");
  const { lines, coupon, summary, applyCoupon, clear } = useCart();
  const settings = getSettingsSync();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleApplyCoupon() {
    if (!couponCode) return;
    const found = await validateCoupon(couponCode);
    if (found) {
      applyCoupon(found);
      setCouponError("");
    } else {
      setCouponError(t("invalidCoupon"));
    }
  }

  async function handleCheckout() {
    setCheckingOut(true);
    await placeOrder({ lines, taxRate: settings.taxRate, deliveryFee: settings.deliveryFee, coupon });
    setCheckingOut(false);
    setSuccess(true);
    clear();
    setTimeout(() => {
      setSuccess(false);
      onOpenChange(false);
    }, 2200);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">{t("title")}</SheetTitle>
        </SheetHeader>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
              >
                <CheckCircle2 className="size-16 text-primary" />
              </motion.div>
              <p className="font-display text-xl">{t("orderPlaced")}</p>
              <p className="text-sm text-muted-foreground">{t("orderPlacedCopy")}</p>
            </motion.div>
          ) : (
            <motion.div key="cart" className="flex flex-1 flex-col overflow-hidden px-6">
              {lines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                  <p>{t("empty")}</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 divide-y divide-border overflow-y-auto">
                    {lines.map((line) => (
                      <CartItem key={line.item.id} line={line} />
                    ))}
                  </div>

                  <div className="space-y-4 border-t border-border py-4">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder={t("couponPlaceholder")}
                          className="pl-9"
                        />
                      </div>
                      <Button variant="outline" onClick={handleApplyCoupon}>
                        {t("apply")}
                      </Button>
                    </div>
                    {couponError && <p className="text-xs text-destructive">{couponError}</p>}
                    {coupon && (
                      <p className="text-xs text-primary">{t("couponApplied", { code: coupon.code })}</p>
                    )}

                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>{t("subtotal")}</span>
                        <span>{formatCurrency(summary.subtotal)}</span>
                      </div>
                      {summary.discount > 0 && (
                        <div className="flex justify-between text-primary">
                          <span>{t("discount")}</span>
                          <span>-{formatCurrency(summary.discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-muted-foreground">
                        <span>{t("tax")}</span>
                        <span>{formatCurrency(summary.tax)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>{t("delivery")}</span>
                        <span>{formatCurrency(summary.delivery)}</span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                        <span>{t("total")}</span>
                        <span>{formatCurrency(summary.total)}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!success && lines.length > 0 && (
          <SheetFooter>
            <Button className="w-full rounded-full" size="lg" disabled={checkingOut} onClick={handleCheckout}>
              {checkingOut ? t("placingOrder") : t("checkout")}
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
