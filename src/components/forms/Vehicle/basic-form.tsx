"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { VehicleFormInputs } from "@/commons/models/Vehicle";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { ComboboxBrand } from "@/components/ui/combobox-brand";
import { formatCurrencyInput, formatNumber, normalizeCurrencyValue } from "@/commons/utils/formatter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { carConditionTypeTranslations } from "@/commons/utils/enum-helpers";


export function BasicForm() {
  const form = useFormContext<VehicleFormInputs>();

  return (
    <div className="grid grid-cols-4 gap-10">
      <FormField
        name="licensePlate"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Placa*</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: HJD3G15" maxLength={7} {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="chassis"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chassi</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: ************54961" maxLength={17} {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="brand"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marca*</FormLabel>
            <FormControl>
              <ComboboxBrand field={field} placeholder="Ex: Renault"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="model"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Modelo*</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: Sandero" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <div className="col-span-2">
        <FormField
          name="version"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Versão</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ex: Sandero EXP 16" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
      <FormField
        name="color"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cor*</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: Prata" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="conditionType"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Condição*</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={String(field.value)} value={String(field.value)}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a condição do veículo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(carConditionTypeTranslations).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="manufacturingYear"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ano Fabricação*</FormLabel>
            <FormControl>
              <Input type="text" inputMode="numeric" placeholder="Ex: 2011" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="modelYear"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ano Modelo*</FormLabel>
            <FormControl>
              <Input type="text" inputMode="numeric" placeholder="Ex: 2012" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="kilometers"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>KM</FormLabel>
            <FormControl>
              <Input 
                type="text" 
                inputMode="numeric" 
                placeholder="Ex: 130.000" 
                {...field}
                value={formatNumber.format(field.value ?? 0)}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '')
                  const numericValue = parseFloat(cleaned)
                  field.onChange(numericValue)
                }}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="fipe"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>FIPE</FormLabel>
            <FormControl>
              <Input 
                type="text" 
                inputMode="numeric"
                placeholder="Ex: R$ 28.589,00" 
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
    </div>
  )
}