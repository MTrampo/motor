import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { VehicleStatusFormInputs } from "@/commons/models/Vehicle";
import { vehicleStatus } from "@/commons/validations/Vehicle";
import { SelectCalendar } from "@/components/ui/select-calendar";
import { CarStatusEnum } from "@/commons/enums/Car";
import { translateEnum } from "@/commons/utils/enum-helpers";
import { DialogFormRef } from "../dialog-form";
import { getNextVehicleStatuses } from "@/commons/utils/status-sequences";
import { toast } from "sonner";

type StatusFormProps = {
  currentStatus: CarStatusEnum
  onHandleSubmit: (data: VehicleStatusFormInputs) => Promise<void>
}

const StatusForm = forwardRef<DialogFormRef, StatusFormProps>(({ currentStatus, onHandleSubmit }, ref) => {
  const statusList = getNextVehicleStatuses(currentStatus)

  const form = useForm<VehicleStatusFormInputs>({
    resolver: zodResolver(vehicleStatus),
    defaultValues: {
      endDatePreviousStatus: new Date(),
      nextStatusStartDate: new Date(),
      newStatus: statusList[0],
      reason: ''
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

  const status = translateEnum('CarStatusType', currentStatus)
  const nextStatus = translateEnum('CarStatusType', form.watch('newStatus'))

  return(
    <Form {...form}>
      <form className="space-y-3 my-6">
        <FormField
          control={form.control}
          name="endDatePreviousStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Término*</FormLabel>
              <SelectCalendar field={field} />
              <FormDescription>
                Data de término da marcha atual: <b>{status}</b>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="newStatus"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marcha*</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a próxima marcha do veículo"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(statusList).map(([key, value]) => (
                    <SelectItem key={key} value={String(value)}>
                      {translateEnum('CarStatusType', value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Escolha a próxima marcha
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nextStatusStartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Início*</FormLabel>
              <SelectCalendar field={field} />
              <FormDescription>
                Data de início da próxima marcha: <b>{nextStatus}</b>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Ex: Veículo precisa de transporte do ponto A ao B"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Motivo para mudança de marcha (opcional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
})

StatusForm.displayName = "StatusForm";
export { StatusForm };