import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PaymentFormInputs } from "@/commons/models/Vehicle";
import { Input } from "@/components/ui/input";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { ComboboxBrand } from "@/components/ui/combobox-brand";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarOrigenEnum } from "@/commons/enums/Car";


export function PaymentForm() {
  const form = useFormContext<PaymentFormInputs>();

  return (
    <div className="grid grid-cols-4 gap-10">
      <FormField
        name="origen"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Origem do Veículo</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={`${CarOrigenEnum.AUCTION}`}>Leilão</SelectItem>
                <SelectItem value={`${CarOrigenEnum.THIRD}`}>Terceiro</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}