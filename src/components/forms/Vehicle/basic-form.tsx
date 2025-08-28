import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { VehicleFormInputs } from "@/commons/models/Vehicle";
import { Input } from "@/components/ui/input";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { ComboboxBrand } from "@/components/ui/combobox-brand";


export function BasicForm() {
  const form = useFormContext<VehicleFormInputs>();

  return (
    <div className="grid grid-cols-4 gap-20">
      <FormField
        name="licensePlate"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Placa</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: HJD3G15" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="color"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cor</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: Prata" {...field}/>
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
            <FormLabel>Marca</FormLabel>
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
            <FormLabel>Modelo</FormLabel>
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
        name="manufacturingYear"
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fabricação</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: 2011" {...field}/>
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
            <FormLabel>Modelo</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: 2012" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  )
}