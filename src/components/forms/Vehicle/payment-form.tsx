"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuctionFormInputs, PaymentFormInputs } from "@/commons/models/Vehicle";
import { Input } from "@/components/ui/input";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { ComboboxBrand } from "@/components/ui/combobox-brand";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarOrigenEnum } from "@/commons/enums/Car";
import { SelectCalendar } from "@/components/ui/select-calendar";
import { formatCurrencyInput, normalizeCurrencyValue } from "@/commons/utils/formatter";
import { Textarea } from "@/components/ui/textarea";
import { auctionTypeTranslations, originTypeTranslations, damageTypeTranslations } from "@/commons/utils/enum-helpers";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaSackDollar } from "react-icons/fa6";


export function PaymentForm() {
  const form = useFormContext<PaymentFormInputs>()
  const origin = form.watch('origin')

  console.log(origin)

  const generateTotalPaid = () => {
    const { bid, commission, administrative, others } = form.getValues() as AuctionFormInputs
    const total = Number(bid || 0) + Number(commission || 0) + Number(administrative || 0) + Number(others || 0)
    form.setValue('totalPaid', total)
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-10 pb-10">
        <FormField
          name="origin"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origem</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a origem do veículo"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(originTypeTranslations).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {origin === String(CarOrigenEnum.THIRD) && (
        <div className="border-t pt-10">
          <div className="grid grid-cols-4 gap-5">
            <FormField
              name="name"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome*</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ex: Aparecida Julia Rafaela Nogueira" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="cpfCnpj"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF*</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ex: 381.044.062-05" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="paid"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço*</FormLabel>
                  <FormControl>
                    <Input 
                      inputMode="numeric" 
                      type="text" 
                      placeholder="Ex: R$ 130,00"  
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
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pagamento*</FormLabel>
                  <SelectCalendar field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalhes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informações adicionais"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      )}
      {origin === String(CarOrigenEnum.AUCTION) && (
        <div className="border-t pt-10">
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-2">
              <FormField
                name="auctionName"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Ex: Motor Leilões" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="consignor"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comitê*</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ex: Motor Seguros S.A" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="code"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código*</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ex: 1056549" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="functional"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condição*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a condição do veículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(auctionTypeTranslations).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="damageType"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo de dano do veículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(damageTypeTranslations).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="bid"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Arrematado*</FormLabel>
                  <FormControl>
                    <Input 
                      inputMode="numeric" 
                      type="text" 
                      placeholder="Ex: R$ 130,00"  
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
              name="commission"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comissão*</FormLabel>
                  <FormControl>
                    <Input 
                      inputMode="numeric" 
                      type="text" 
                      placeholder="Ex: R$ 130,00"  
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
              name="administrative"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Taxa Administrativa</FormLabel>
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
              name="others"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outros Valores</FormLabel>
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
              name="totalPaid"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem className="w-full cursor-not-allowed">
                  <FormLabel>Total Pago*</FormLabel>
                  <div className="flex items-end gap-2">
                    <FormControl>
                      <Input
                        inputMode="numeric" 
                        type="text" 
                        placeholder="Ex: R$ 130,00"  
                        {...field}
                        value={formatCurrencyInput(field.value)}
                        onChange={(e) => {
                          const floatValue = normalizeCurrencyValue(e.target.value)
                          field.onChange(floatValue)
                        }}
                        disabled
                      />
                    </FormControl>
                    <Button type="button" variant='outline' size="icon" onClick={generateTotalPaid}>
                      <FaSackDollar />
                    </Button>
                  </div>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pagamento*</FormLabel>
                  <SelectCalendar field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalhes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informações adicionais"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}