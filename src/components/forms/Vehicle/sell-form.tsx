import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SelectCalendar } from "@/components/ui/select-calendar";
import { DialogFormRef } from "../dialog-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { formatCurrencyInput, normalizeCurrencyValue } from "@/commons/utils/formatter";
import { VehicleSellFormInputs } from "@/commons/models/Sale";
import { vehicleSell } from "@/commons/validations/Sale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { paymentMethodForSaleTranslations } from "@/commons/utils/enum-helpers";

type SellFormFormProps = {
  onHandleSubmit: (data: VehicleSellFormInputs) => Promise<void>
}

const SellForm = forwardRef<DialogFormRef, SellFormFormProps>(({ onHandleSubmit }, ref) => {
  const form = useForm<VehicleSellFormInputs>({
    resolver: zodResolver(vehicleSell),
    defaultValues: {
      price: 0,
      sell: new Date(),
      paymentMethod: 0,
      note: '',
    }
  })
  
  useImperativeHandle(ref, () => ({
    onSubmit: async () => {
      const isValid = await form.trigger()
      if (isValid) {
        await onHandleSubmit(form.getValues())
        return true
      }
    
      toast.error("Por favor, preencha os campos obrigatórios.")
      return false
    }
  }))

  return(
    <Form {...form}>
      <form className="space-y-3 my-6">
        <FormField
          control={form.control}
          name="sell"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venda*</FormLabel>
              <SelectCalendar field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço*</FormLabel>
              <FormControl>
                <Input 
                  inputMode="numeric" 
                  type="text" 
                  placeholder="Ex: R$ 70.000,00"  
                  {...field}
                  value={formatCurrencyInput(field.value)}
                  onChange={(e) => {
                    const floatValue = normalizeCurrencyValue(e.target.value)
                    field.onChange(floatValue)
                  }}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          name="paymentMethod"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método*</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o método de pagamento"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(paymentMethodForSaleTranslations).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nota</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Ex: Veículo vendido com desconto para pagamento à vista."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
})

SellForm.displayName = "SellForm";
export { SellForm };