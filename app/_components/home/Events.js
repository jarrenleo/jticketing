"use client";

import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { Button } from "@/app/_components/ui/Button";

export default function Events({ events }) {
  const [initialDisplayCount, setInitialDisplayCount] = useState();
  const [displayCount, setDisplayCount] = useState();

  const displayedEvents = events.slice(0, displayCount);
  const hasMoreEvents = displayedEvents.length < events.length;

  useEffect(() => {
    const displayCount =
      window.innerWidth >= 1280 ? 8 : window.innerWidth >= 1024 ? 6 : 4;

    setInitialDisplayCount(displayCount);
    setDisplayCount(displayCount);
  }, []);

  function loadMoreEvents() {
    setDisplayCount((previousCount) => previousCount + initialDisplayCount);
  }

  return (
    <div className="mb-12">
      <h2 className="mb-4 text-xl font-bold">Events</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedEvents.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>

      {hasMoreEvents && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={loadMoreEvents}
            className="mt-8 rounded-xl font-semibold"
          >
            <span>Show More</span>
          </Button>
        </div>
      )}
    </div>
  );
}
