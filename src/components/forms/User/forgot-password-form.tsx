'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { FaEnvelopesBulk } from "react-icons/fa6";
import { ForgotPasswordFormInputs } from "@/commons/models/User"; 
import { forgotPasswordFormSchema } from "@/commons/validations/User";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { useUser } from "@/hooks/use-user";


export function ForgotPasswordForm() {
  const { passwordResetRequest } = useUser()
  const formUser = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    }
  })

  const handlePasswordResetRequest = async(data: ForgotPasswordFormInputs) => {
    await passwordResetRequest(data.email)
    formUser.reset()
  }

  return (
    <Form {...formUser}>
      <form className="space-y-3" onSubmit={formUser.handleSubmit(handlePasswordResetRequest)}>
        <FormField
          name="email"
          control={formUser.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="mcqueen@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant='default' className="w-full gap-3" type="submit">
          ENVIAR <FaEnvelopesBulk className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  )
}