// components/ui/select-calendar.jsx

'use client'

import { cn } from "@/commons/lib/utils";
import { CalendarIcon } from "lucide-react";
import { FormControl } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { format } from "date-fns";
import { Calendar } from "./calendar";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { ptBR } from "date-fns/locale";


type SelectCalendarProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>;
}

export function SelectCalendar<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  field,
}: SelectCalendarProps<TFieldValues, TName>) {
  
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            type="button"
            variant='outline'
            className={cn(
              "font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP", { locale: ptBR })
            ) : (
              <span>Selecione uma data</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}