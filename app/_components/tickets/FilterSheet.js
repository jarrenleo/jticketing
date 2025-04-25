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

export default function FilterSheet({
  selectedDate,
  setSelectedDate,
  selectedQuantity,
  setSelectedQuantity,
  selectedCategory,
  setSelectedCategory,
  selectedSection,
  setSelectedSection,
  tickets,
}) {
  const availableDates = getUniqueData(tickets, "date");
  const availableQuantities = getUniqueData(tickets, "quantity");
  const availableCategories = getUniqueData(tickets, "category");
  const availableSections = getUniqueData(tickets, "section");

  function clearFilters() {
    setSelectedDate("");
    setSelectedQuantity("");
    setSelectedCategory("");
    setSelectedSection("");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent hover:transition-colors">
          <SlidersHorizontal width={14} height={14} />
          <span>Filters</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col px-0">
        <SheetHeader className="border-b border-border px-4 pb-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col justify-between px-4">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Date</label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Date" />
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map((date, index) => (
                    <SelectItem key={index} value={date}>
                      {formatDateTime(date)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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

            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category.toString()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Combobox
                value={selectedSection}
                setValue={setSelectedSection}
                field={"Section"}
                fieldData={availableSections}
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full text-base"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
