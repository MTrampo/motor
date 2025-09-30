'use client'

import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { FaCartPlus, FaTrashCan } from "react-icons/fa6";
import { registerCostFormSchema } from "@/commons/validations/Cost";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { currencyFormatter, dateFormatter, formatCurrencyInput, normalizeCurrencyValue } from "@/commons/utils/formatter";
import { RegisterCostFormInputs } from "@/commons/models/Cost";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { costTypeTranslations } from "@/commons/utils/enum-helpers";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectCalendar } from "@/components/ui/select-calendar";
import { CostTypeText } from "@/components/vehicles/cost-type";
import { SheetFormRef } from "../sheet-form";


type RegisterCostFormProps = {
  onHandleSubmit: (data: RegisterCostFormInputs[]) => void
}

const RegisterCostForm = forwardRef<SheetFormRef, RegisterCostFormProps>(({ onHandleSubmit }, ref) => {
  const [costs, setCosts] = useState<RegisterCostFormInputs[]>([])

  const formCost = useForm<RegisterCostFormInputs>({
    resolver: zodResolver(registerCostFormSchema),
    defaultValues: {
      guid: '',
      description: '',
      value: 0,
      type: 0,
      paymentDate: new Date(),
    }
  }) 

  const handleAddCost = (data: RegisterCostFormInputs) => {
    setCosts((cost) => [data, ...cost])
    formCost.reset({
      type: data.type
    })
  }

  const handleRemoveCost = (index: number) => {
    setCosts((cost) => cost.filter((_, i) => i !== index));
  }

  useImperativeHandle(ref, () => ({
    isValid: costs.length > 0,
    errMessage: 'Por favor, adicione pelo menos um custo.',
    onSubmit: () => onHandleSubmit(costs)
  }))

  return(
    <Form {...formCost}>
      <form className="space-y-3" onSubmit={formCost.handleSubmit(handleAddCost)}>
        <FormField
          name="description"
          control={formCost.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ex: Guincho: Ribeirão SP - São Paulo SP" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          name="value"
          control={formCost.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input 
                  inputMode="numeric" 
                  type="text" 
                  placeholder="Ex: R$ 130,00"  
                  {...field}
                  value={formatCurrencyInput(field.value ?? 0)}
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
          name="type"
          control={formCost.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo do custo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(costTypeTranslations).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={formCost.control}
          name="paymentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pagamento</FormLabel>
              <SelectCalendar field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full gap-x-2 mt-3" type="submit">
          ADICIONAR ITEM <FaCartPlus  className="h-4 w-4"/>
        </Button>
      </form>
      <div className="flex flex-col gap-5 mt-10">
        {costs.map((cost, i) => (
          <Card key={cost.description+i}>
            <CardHeader>
              <CardTitle className="text-lg">
                <CostTypeText type={cost.type}/>
              </CardTitle>
              <CardAction>
                <Button variant='destructive' size='icon' onClick={() => handleRemoveCost(i)}>
                  <FaTrashCan />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <CardDescription>{cost.description}</CardDescription>
            </CardContent>
            <CardFooter className="justify-between items-center">
              <span>{currencyFormatter.format(cost.value)}</span>
              <span>{dateFormatter.format(cost.paymentDate)}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Form>
  )
})

RegisterCostForm.displayName = "RegisterCostForm";
export { RegisterCostForm };