"use client";

import { useState } from "react";
import Filter from "./Filter";
import TicketListItem from "./TicketListItem";
import { ScrollArea } from "../ui/ScrollArea";

export default function TicketList({ tickets }) {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Ticket Listing</h2>
        <div>
          <Filter
            selectedDateTime={selectedDateTime}
            setSelectedDateTime={setSelectedDateTime}
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            tickets={tickets}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100dvh-380px)]">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketListItem
              key={ticket.id}
              ticket={ticket}
              onAddToCart={() => handleAddToCart(ticket)}
            />
          ))
        ) : (
          <div className="rounded-lg border bg-white p-8 text-center">
            <p className="text-muted-foreground">
              No tickets available for the selected filter
            </p>
          </div>
        )}
      </ScrollArea>
    </section>
  );
}
