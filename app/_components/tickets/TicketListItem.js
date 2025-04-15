"use client";

import { Button } from "../ui/Button";
import { formatDateTime } from "../../_lib/utils";
import { ShoppingCart } from "lucide-react";

export default function TicketListItem({ ticket, onAddToCart }) {
  const { section, row, price, quantity, listing_count, datetime } = ticket;

  return (
    <div className="rounded-md bg-muted">
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">Section {section}</h3>
            <p className="text-sm text-muted-foreground">Row {row}</p>
            {listing_count > 1 && (
              <p className="mt-1 text-xs text-primary">
                {listing_count} listings available
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">${price.toFixed(2)} each</div>
            <p className="text-sm text-muted-foreground">
              {quantity} ticket{quantity > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {formatDateTime(datetime)}
        </div>

        <Button className="w-full" onClick={onAddToCart}>
          <ShoppingCart height={20} width={20} />
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
