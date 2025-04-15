"use client";

import { useState } from "react";
import Filter from "./Filter";
import TicketListItem from "./TicketListItem";
import { ScrollArea } from "../ui/ScrollArea";
import { Separator } from "../ui/Separator";

export default function TicketList({ tickets }) {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <section className="col-span-3">
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

      <div className="flex flex-col gap-4 sm:grid sm:flex-none sm:grid-cols-2 sm:gap-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <>
              <TicketListItem
                key={ticket.id}
                ticket={ticket}
                onAddToCart={() => handleAddToCart(ticket)}
              />
            </>
          ))
        ) : (
          <div className="rounded-lg border bg-white p-8 text-center">
            <p className="text-muted-foreground">
              No tickets available for the selected filter
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
