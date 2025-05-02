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
import { retrieveImageUrl } from "@/app/_lib/utils";
import { Search } from "lucide-react";

export default function SearchSheet({
  isSearchOpen,
  setIsSearchOpen,
  events,
  error,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchTerm || error) return;

    const results = events.filter(
      (event) =>
        event.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(results);
  }, [searchTerm, events, error]);

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
              placeholder="Search artists or events"
              className="pl-8 pr-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          {searchTerm && !error && (
            <div>
              {searchResults.length ? (
                <>
                  <p className="mb-2 px-4 text-sm text-muted-foreground">
                    {`${searchResults.length} ${searchResults.length === 1 ? "result" : "results"} found`}
                  </p>
                  <ul>
                    {searchResults.map((event) => (
                      <li key={event.slug}>
                        <SheetClose asChild>
                          <Link
                            href={`/tickets/${event.slug}`}
                            className="group flex items-center gap-4 p-4 transition-colors hover:bg-accent"
                          >
                            <div className="relative h-12 w-[110.4px] overflow-hidden rounded-md">
                              <Image
                                src={retrieveImageUrl(
                                  "events",
                                  event.image_file,
                                )}
                                alt={event.artist}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="line-clamp-1 text-sm font-semibold group-hover:text-accent-foreground group-hover:transition-colors">
                                {event.artist}
                              </p>
                              <p className="line-clamp-1 text-sm text-muted-foreground">
                                {event.title}
                              </p>
                            </div>
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-8 text-center text-muted-foreground">
                  No results found.
                </p>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
