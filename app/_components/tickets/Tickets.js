"use client";

import { useState, useEffect, useRef } from "react";
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

export default function Tickets({ eventData, ticketsData }) {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [ticketScrollArea, setTicketScrollArea] = useState(0);
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

  useEffect(() => {
    if (!viewportHeight) return;

    const scrollArea = (viewportHeight - 421.33).toFixed(2);
    setTicketScrollArea(scrollArea);
  }, [viewportHeight]);

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, filter: "blur-sm" },
        visible: { opacity: 1 },
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {viewportWidth < 1024 ? (
          <>
            <EventCard event={eventData} />
            <Tabs defaultValue="ticket_listing">
              <TabsList className="mb-2 w-full">
                <TabsTrigger
                  value="ticket_listing"
                  className="w-full font-semibold"
                >
                  Tickets
                </TabsTrigger>
                <TabsTrigger value="seat_map" className="w-full font-semibold">
                  Seat Map
                </TabsTrigger>
              </TabsList>
              <TabsContent value="ticket_listing">
                <TicketList
                  tickets={ticketsData}
                  onAddToCart={handleAddToCart}
                />
              </TabsContent>
              <TabsContent value="seat_map">
                <SeatMap event={eventData} />
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            <EventCard event={eventData} />
            <div className="grid grid-cols-5 gap-8">
              <TicketList
                tickets={ticketsData}
                ticketScrollArea={ticketScrollArea}
                onAddToCart={handleAddToCart}
              />
              <SeatMap event={eventData} />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
