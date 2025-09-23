"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/Select";

export default function SortSelect({ selectedSort, setSelectedSort }) {
  return (
    <Select value={selectedSort} onValueChange={setSelectedSort}>
      <SelectTrigger className="rounded-xl font-medium data-[placeholder]:text-foreground">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-border">
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="price_asc" className="hover:rounded-lg">
            Price, low to high
          </SelectItem>
          <SelectItem value="price_desc" className="hover:rounded-lg">
            Price, high to low
          </SelectItem>
          {/* <SelectItem value="row_asc">Row, a-z</SelectItem>
          <SelectItem value="row_desc">Row, z-a</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
