"use client";

import { useState } from "react";
import SearchSheet from "./SearchSheet";
import { Search } from "lucide-react";

export default function SearchButton({ events }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="rounded-md p-1.5 transition-colors hover:bg-accent"
      >
        <Search width={20} height={20} />
      </button>
      <SearchSheet
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        events={events}
      />
    </>
  );
}
