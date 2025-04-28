"use client";

import { useState, useEffect } from "react";
import FilterSheet from "./FilterSheet";
import TicketListItem from "./TicketListItem";
import SortSelect from "./SortSelect";

function filterTickets(tickets, field, value) {
  return tickets.filter((ticket) => ticket[field] === value);
}

export default function TicketList({ tickets, ticketScrollArea, onAddToCart }) {
  const [displayTickets, setDisplayTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    let filteredTickets = tickets;

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

    if (selectedSection)
      filteredTickets = filterTickets(
        filteredTickets,
        "section",
        selectedSection,
      );

    if (selectedSort)
      filteredTickets = [...filteredTickets].sort((a, b) => {
        switch (selectedSort) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "row_asc":
            return a.row
              .toString()
              .localeCompare(b.row.toString(), undefined, { numeric: true });
          case "row_desc":
            return b.row
              .toString()
              .localeCompare(a.row.toString(), undefined, { numeric: true });
          default:
            return "";
        }
      });

    setDisplayTickets(filteredTickets);
  }, [
    selectedDate,
    selectedQuantity,
    selectedCategory,
    selectedSection,
    selectedSort,
  ]);

  return (
    <section className="col-span-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Tickets</h2>
        <div className="flex items-center gap-2">
          <FilterSheet
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            tickets={tickets}
          />
          <SortSelect
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>
      </div>

      <div
        className={`${ticketScrollArea && "scrollbar-hide overflow-y-auto"}`}
        style={ticketScrollArea ? { height: `${ticketScrollArea}px` } : {}}
      >
        <div
          className={`flex flex-col gap-4 ${displayTickets.length && "sm:grid sm:flex-none sm:grid-cols-2"}`}
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
              No tickets available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
