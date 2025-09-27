"use client";

import { useState, useEffect } from "react";
import FilterSheet from "./FilterSheet";
import TicketListItem from "./TicketListItem";
import SortSelect from "./SortSelect";

function filterTickets(tickets, field, value) {
  return tickets.filter((ticket) => ticket[field] === value);
}

export default function TicketList({ tickets, onAddToCart }) {
  const [displayTickets, setDisplayTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    let filteredTickets = tickets;

    filteredTickets = filteredTickets.filter((ticket) => ticket.num_sets > 0);

    if (selectedDate)
      filteredTickets = filterTickets(filteredTickets, "date", selectedDate);

    if (selectedQuantity)
      filteredTickets = filterTickets(
        filteredTickets,
        "quantity",
        +selectedQuantity,
      );

    if (selectedCategory)
      filteredTickets = filterTickets(
        filteredTickets,
        "category",
        selectedCategory,
      );

    if (selectedSort)
      filteredTickets = [...filteredTickets].sort((a, b) => {
        switch (selectedSort) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          default:
            return 0;
        }
      });

    setDisplayTickets(filteredTickets);
  }, [tickets, selectedDate, selectedQuantity, selectedCategory, selectedSort]);

  return (
    <section className="col-span-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Tickets</h2>
        <div
          className={`flex items-center gap-2 ${displayTickets.length > 6 && "lg:pr-[31.33px]"}`}
        >
          <FilterSheet
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            tickets={tickets}
          />
          <SortSelect
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>
      </div>

      <div className="scrollbar-none lg:scrollbar lg:scrollbar-thumb-muted-foreground/25 lg:scrollbar-track-background overflow-y-auto lg:max-h-[599.96px]">
        <div
          className={`flex flex-col gap-4 ${displayTickets.length > 6 && "lg:pr-4"} ${displayTickets.length && "sm:grid sm:flex-none sm:grid-cols-2"}`}
        >
          {displayTickets.length ? (
            displayTickets.map((ticket) => (
              <TicketListItem
                key={ticket.id}
                ticket={ticket}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div className="mt-8 text-center text-muted-foreground">
              No tickets available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
