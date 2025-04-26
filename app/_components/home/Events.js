"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import EventCard from "./EventCard";

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
    <section>
      <h2 className="mb-4 text-lg font-bold">Events</h2>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedEvents.map((event, index) => (
          <motion.div
            key={event.slug}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, filter: "blur-sm" },
              visible: { opacity: 1, filter: "blur-none" },
            }}
            transition={{ delay: (index % initialDisplayCount) * 0.2 }}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </div>

      {hasMoreEvents && (
        <div className="flex justify-center">
          <button
            onClick={loadMoreEvents}
            className="mt-4 rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
