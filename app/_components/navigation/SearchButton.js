"use client";

import { useState, useEffect } from "react";
import SearchSheet from "./SearchSheet";
import { Search } from "lucide-react";
import { getEvents } from "@/app/_lib/dataService";

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSearchOpen) return;

    (async function () {
      const { data, error } = await getEvents();
      if (error) {
        setError(error);
        return;
      }

      setEvents(data);
    })();
  }, [isSearchOpen]);

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="group rounded-xl p-2 transition-colors hover:bg-accent"
      >
        <Search
          width={20}
          height={20}
          className="group-hover:stroke-accent-foreground group-hover:transition-colors"
        />
      </button>
      <SearchSheet
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        events={events}
        error={error}
      />
    </>
  );
}
