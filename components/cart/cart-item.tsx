"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartLine } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

export function CartItem({ line }: { line: CartLine }) {
  const { setQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4">
      <MediaPlaceholder ratio="square" className="size-16 shrink-0 rounded-md" />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-tight">{line.item.name}</p>
          <button
            aria-label={`Remove ${line.item.name}`}
            onClick={() => removeItem(line.item.id)}
            className="text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground">{formatCurrency(line.item.price)}</p>
        <div className="mt-1 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-7 rounded-full"
            aria-label="Decrease quantity"
            onClick={() => setQuantity(line.item.id, line.quantity - 1)}
          >
            <Minus className="size-3" aria-hidden="true" />
          </Button>
          <span className="w-6 text-center text-sm">{line.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="size-7 rounded-full"
            aria-label="Increase quantity"
            onClick={() => setQuantity(line.item.id, line.quantity + 1)}
          >
            <Plus className="size-3" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
