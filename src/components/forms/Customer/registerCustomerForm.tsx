'use client'

import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { FaArrowRightLong, FaCircleXmark, FaUserCheck, FaUsersLine   } from "react-icons/fa6";
import { CustomerFormatted, RegisterCustomerFormInputs } from "@/commons/models/Customer";
import { registerCustomerFormSchema } from "@/commons/validations/Customer";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { fullNameFormatter, phoneFormatter } from "@/commons/utils/formatter";


type RegisterCustomerFormProps = {
  customers: CustomerFormatted[]
  setRegister: Dispatch<SetStateAction<boolean>>
  onHandleSubmitCustomer: (data: RegisterCustomerFormInputs) => void
}

export function RegisterCustomerForm({ customers, setRegister, onHandleSubmitCustomer }: RegisterCustomerFormProps) {
  const formCustomer = useForm<RegisterCustomerFormInputs>({
    resolver: zodResolver(registerCustomerFormSchema),
    defaultValues: {
      name: '',
      whatsapp: ''
    }
  })

  useEffect(() => {
    const isItTheSame = customers.some(customer => customer.whatsapp === formCustomer.getValues('whatsapp'))
    isItTheSame ? formCustomer.setError('whatsapp', { message: 'Esse whatsapp já foi cadastrado!' }) : formCustomer.clearErrors('whatsapp')
  },[formCustomer.watch('whatsapp')])

  return(
    <Form {...formCustomer}>
      <form className="space-y-3" onSubmit={formCustomer.handleSubmit(onHandleSubmitCustomer)}>
        <FormField
          name="name"
          control={formCustomer.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input 
                  type="text" 
                  placeholder="Ex: Sally Carrera" 
                  {...field}
                  value={fullNameFormatter(field.value)}
                  onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          name="whatsapp"
          control={formCustomer.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp</FormLabel>
              <FormControl>
                <Input 
                  type="tel" 
                  inputMode="numeric"
                  placeholder="Ex: (11) 94002-8922"
                  maxLength={15}
                  {...field}
                  value={phoneFormatter(field.value)}
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))} 
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button className="p-5" variant="outline" size="icon" onClick={() => setRegister(register => !register)}>
            <FaUsersLine className="h-5 w-5 shrink-0"/>
          </Button>
          <Button className="w-full gap-x-2" type="submit" disabled={!!formCustomer.formState.errors.whatsapp}>
            ORÇAMENTO <FaArrowRightLong className="h-4 w-4"/>
          </Button>
        </div>
      </form>
    </Form>
  )
}