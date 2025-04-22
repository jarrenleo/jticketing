"use client";

import { Button } from "../ui/Button";
import { formatDateTime } from "../../_lib/utils";

export default function TicketListItem({ ticket, onAddToCart }) {
  const { category, section, row, price, quantity, num_sets, datetime } =
    ticket;

  return (
    <div className="flex flex-col rounded-md border border-border p-4">
      <div className="flex items-center justify-between text-lg font-bold">
        <span className="line-clamp-1">{category}</span>
        <span>RM {price}</span>
      </div>

      <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
        <span className="line-clamp-1">
          Section {section}, Row {row}
        </span>
        <span>per ticket</span>
      </div>

      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
          Set of {quantity}
        </span>
        <span className="text-sm text-primary">{num_sets} sets available</span>
      </div>

      <span className="mb-4 text-sm text-muted-foreground">
        {formatDateTime(datetime)}
      </span>

      <Button className="w-full" onClick={() => onAddToCart(ticket)}>
        <span className="text-sm">Add to Cart</span>
      </Button>
    </div>
  );
}
