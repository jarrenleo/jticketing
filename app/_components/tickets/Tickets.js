"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/_contexts/CartContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/Tabs";
import EventCard from "./EventCard";
import EventInfo from "./EventInfo";
import TicketList from "./TicketList";
import SeatMap from "./SeatMap";

export default function Tickets({ eventData, ticketsData }) {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    setViewportWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleAddToCart(ticket) {
    const item = {
      ...ticket,
      ...eventData,
      id: ticket.id,
      cartQuantity: 1,
    };
    addItem(item);
    openCart();
  }

  if (!viewportWidth || !viewportHeight) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <EventCard event={eventData} />
      <EventInfo additionalInfo={eventData.additional_info} />
      {viewportWidth < 1024 ? (
        <>
          <Tabs defaultValue="ticket_listing">
            <TabsList className="mb-2 w-full rounded-xl">
              <TabsTrigger
                value="ticket_listing"
                className="w-full rounded-lg font-semibold"
              >
                Tickets
              </TabsTrigger>
              <TabsTrigger
                value="seat_map"
                className="w-full rounded-lg font-semibold"
              >
                Seat Map
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ticket_listing">
              <TicketList tickets={ticketsData} onAddToCart={handleAddToCart} />
            </TabsContent>
            <TabsContent value="seat_map">
              <SeatMap event={eventData} />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-8">
            <TicketList tickets={ticketsData} onAddToCart={handleAddToCart} />
            <SeatMap event={eventData} />
          </div>
        </>
      )}
    </div>
  );
}
