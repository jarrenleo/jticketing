"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/_contexts/CartContext";
import { motion } from "motion/react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/Tabs";
import EventCard from "./EventCard";
import TicketList from "./TicketList";
import SeatMap from "./SeatMap";

export default function Tickets({ ticketsData, eventData }) {
  const [viewportWidth, setViewportWidth] = useState(0);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    setViewportWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
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

  if (!viewportWidth) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <EventCard event={eventData} />

      {viewportWidth < 1024 ? (
        <Tabs defaultValue="ticket_listing" className="w-full">
          <TabsList className="mb-2 w-full">
            <TabsTrigger value="ticket_listing" className="w-full">
              Ticket Listing
            </TabsTrigger>
            <TabsTrigger value="seat_map" className="w-full">
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
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, filter: "blur-sm" },
            visible: { opacity: 1, filter: "blur-none" },
          }}
          className="w-full"
        >
          <div className="grid grid-cols-5 gap-8">
            <SeatMap event={eventData} />
            <TicketList tickets={ticketsData} onAddToCart={handleAddToCart} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
