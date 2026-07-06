"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function CartButton() {
  const { itemCount, isOpen, open, close } = useCart();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Open cart, ${itemCount} items`}
        onClick={open}
        className="relative rounded-full"
        data-cursor-hover
      >
        <ShoppingBag className="size-4" aria-hidden="true" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {itemCount}
          </span>
        )}
      </Button>
      <CartDrawer open={isOpen} onOpenChange={(v) => (v ? open() : close())} />
    </>
  );
}
