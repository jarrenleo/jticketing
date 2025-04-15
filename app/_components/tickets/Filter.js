"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";
import { Combobox } from "../ui/Combobox";
import { Button } from "../ui/Button";
import { getUniqueData, formatDateTime } from "@/app/_lib/utils";
import { SlidersHorizontal } from "lucide-react";

export default function TicketFilters({
  selectedDateTime,
  setSelectedDateTime,
  selectedQuantity,
  setSelectedQuantity,
  selectedSection,
  setSelectedSection,
  tickets,
}) {
  const availableDateTimes = getUniqueData(tickets, "datetime");
  const availableQuantities = getUniqueData(tickets, "quantity");
  const availableSections = getUniqueData(tickets, "section");

  function clearFilters() {
    setSelectedDateTime("");
    setSelectedQuantity("");
    setSelectedSection("");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 rounded-md bg-muted px-4 py-2 font-medium hover:bg-accent hover:transition-colors">
          <SlidersHorizontal width={16} height={16} />
          <span>Filters</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-4">
            {/* Date Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Date & Time
              </label>
              <Select
                value={selectedDateTime}
                onValueChange={setSelectedDateTime}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Date & Time" />
                </SelectTrigger>
                <SelectContent>
                  {availableDateTimes.map((datetime, index) => (
                    <SelectItem key={index} value={datetime}>
                      {formatDateTime(datetime)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium">Quantity</label>
              <Select
                value={selectedQuantity}
                onValueChange={setSelectedQuantity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Quantity" />
                </SelectTrigger>
                <SelectContent>
                  {availableQuantities.map((quantity) => (
                    <SelectItem key={quantity} value={quantity.toString()}>
                      {quantity} {quantity === 1 ? "Ticket" : "Tickets"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section Filter */}
            <Combobox
              value={selectedSection}
              setValue={setSelectedSection}
              field={"Section"}
              fieldData={availableSections}
            />
          </div>

          <Button
            variant="outline"
            className="mt-auto w-full"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
