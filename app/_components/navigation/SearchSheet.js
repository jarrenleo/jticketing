"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../ui/Sheet";
import { Input } from "../ui/Input";
import { Search } from "lucide-react";
import { retrieveImageUrl } from "@/app/_lib/utils";

export default function SearchSheet({ isSearchOpen, setIsSearchOpen, events }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;

    const results = events.filter(
      (event) =>
        event.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(results);
  }, [searchTerm, events]);

  return (
    <Sheet open={isSearchOpen} onOpenChange={(open) => setIsSearchOpen(open)}>
      <SheetContent className="overflow-y-auto px-0">
        <SheetHeader className="border-b border-border px-4 pb-4">
          <SheetTitle>Search Events</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <div className="relative mb-4 px-4">
            <Search
              className="absolute left-6 top-2.5 text-muted-foreground"
              width={16}
              height={16}
            />
            <Input
              type="search"
              placeholder="Search events, artists, venues"
              className="pl-8 pr-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          {searchTerm && (
            <div>
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  <p className="mb-4 px-4 text-sm font-normal text-muted-foreground">
                    {`${searchResults.length} ${searchResults.length === 1 ? "result" : "results"} found`}
                  </p>
                  <ul className="divide-border">
                    {searchResults.map((event) => (
                      <li key={event.slug}>
                        <SheetClose asChild>
                          <Link
                            href={`/tickets/${event.slug}`}
                            className="flex items-center gap-4 p-4 transition-colors hover:bg-accent"
                          >
                            <div className="relative h-12 w-[91px] flex-shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={retrieveImageUrl(
                                  "events",
                                  event.image_file,
                                )}
                                alt={event.artist}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="line-clamp-1 text-sm font-semibold">
                                {event.artist}
                              </span>
                              <span className="line-clamp-1 text-sm text-muted-foreground">
                                {event.title}
                              </span>
                            </div>
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="py-8 text-center">No results found.</p>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
