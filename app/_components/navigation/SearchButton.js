"use client";

import { useState } from "react";
import SearchSheet from "./SearchSheet";
import { Search } from "lucide-react";

export default function SearchButton({ events, error }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="group rounded-md p-1.5 transition-colors hover:bg-accent"
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
