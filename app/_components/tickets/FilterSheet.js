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
  selectedDateTime,
  setSelectedDateTime,
  selectedQuantity,
  setSelectedQuantity,
  selectedCategory,
  setSelectedCategory,
  selectedSection,
  setSelectedSection,
  tickets,
}) {
  const availableDateTimes = getUniqueData(tickets, "datetime");
  const availableQuantities = getUniqueData(tickets, "quantity");
  const availableCategories = getUniqueData(tickets, "category");
  const availableSections = getUniqueData(tickets, "section");

  function clearFilters() {
    setSelectedDateTime("");
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
