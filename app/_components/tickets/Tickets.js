"use client";

import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/Tabs";
import TicketList from "@/app/_components/tickets/TicketList";
import SeatMap from "@/app/_components/tickets/SeatMap";

export default function Tickets({ ticketsData, eventData }) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="container mx-auto flex px-4 py-8">
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
            <TicketList tickets={ticketsData} />
          </TabsContent>
          <TabsContent value="seat_map">
            <SeatMap event={eventData} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid w-full grid-cols-5 gap-8">
          <TicketList tickets={ticketsData} />
          <SeatMap event={eventData} />
        </div>
      )}
    </main>
  );
}
