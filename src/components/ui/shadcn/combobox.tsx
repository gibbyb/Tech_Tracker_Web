"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/shadcn/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/shadcn/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/shadcn/popover"

// Define the type correctly as an array of objects
type ListItem = {
  value: string;
  label: string;
};

type ComboboxDemoProps = {
  listItems: ListItem[];
};

export function ComboboxDemo({ listItems }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectedItem = listItems.find(
    (item) => item.value === value)?.label ?? "Select listItem...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedItem}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search listItem..." />
          <CommandEmpty>No Item found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {listItems.map((listItem) => (
                <CommandItem
                  key={listItem.value}
                  value={listItem.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === listItem.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {listItem.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}