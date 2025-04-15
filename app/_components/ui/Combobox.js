"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "../../_lib/utils";
import { Button } from "./Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

export function Combobox({ value, setValue, field, fieldData }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <label className="mb-2 block text-sm font-medium">{field}</label>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between px-3 font-normal hover:bg-transparent ${
            value
              ? "text-foreground"
              : "text-muted-foreground hover:text-muted-foreground"
          }`}
        >
          {value || `Select ${field}`}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={`Search ${field}`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {field} found</CommandEmpty>
            <CommandGroup>
              {fieldData.map((data) => (
                <CommandItem
                  key={data}
                  value={data}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {data}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === data ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
