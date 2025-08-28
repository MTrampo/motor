import { ControllerRenderProps, FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { FormControl } from "./form";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { cn } from "@/commons/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import brads from "@/commons/data/brands.json"

type ComboboxBrandProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>
  placeholder: string
}

export function ComboboxBrand<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  field,
  placeholder
}: ComboboxBrandProps<TFieldValues, TName>) {
  const form = useFormContext<TFieldValues>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between",
              !field.value && "text-muted-foreground font-normal"
            )}
          >
            {field.value
              ? brads.find(
                  (brand) => brand.name === field.value
                )?.name
              : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Marca não encontrada.</CommandEmpty>
            <CommandGroup>
              {brads.map((brand) => (
                <CommandItem
                  value={brand.name}
                  key={brand.id}
                  onSelect={() => {
                    form.setValue(field.name, brand.name as PathValue<TFieldValues, TName>)
                  }}
                >
                  {brand.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      brand.name === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}