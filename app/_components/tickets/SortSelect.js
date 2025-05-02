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
      <SelectTrigger className="font-medium data-[placeholder]:text-foreground">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="price_asc">Price, low to high</SelectItem>
          <SelectItem value="price_desc">Price, high to low</SelectItem>
          <SelectItem value="row_asc">Row, a-z</SelectItem>
          <SelectItem value="row_desc">Row, z-a</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
