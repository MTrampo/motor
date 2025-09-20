'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { FaEye, FaEyeSlash, FaPersonWalkingArrowRight  } from "react-icons/fa6";
import { UserSignInFormInputs } from "@/commons/models/User"; 
import { userSignInFormSchema } from "@/commons/validations/User";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";
import { GiCarSeat } from "react-icons/gi";
import { useRedirect } from "@/hooks/use-redirect";

export function SignInUserForm() {
  const { redirectToPathRequestedOrDefault } = useRedirect()
  
  const [viewPassword, setViewPassword] = useState(false)
  const { handleSignInUser } = useUser()

  const signInUser = async (data: UserSignInFormInputs) => {
    await handleSignInUser(data)
    redirectToPathRequestedOrDefault('/dashboard')
  }

  const formUser = useForm<UserSignInFormInputs>({
    resolver: zodResolver(userSignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  return(
    <Form {...formUser}>
      <form className="space-y-3 my-6" onSubmit={formUser.handleSubmit(signInUser)}>
        <FormField
          name="email"
          control={formUser.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="text" placeholder="mcqueen@email.com" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={formUser.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Senha</FormLabel>
                {viewPassword ? (
                  <FaEye className="cursor-pointer" onClick={() => setViewPassword(false)} />
                ) : (
                  <FaEyeSlash className="cursor-pointer" onClick={() => setViewPassword(true)} />
                )}
              </div>
              <FormControl>
                <Input 
                  type={viewPassword ? 'text' : 'password'}
                  placeholder="*********" {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Button variant='default' className="w-full gap-3" type="submit">
          DAR PARTIDA <GiCarSeat/>
        </Button>
      </form>
    </Form>
  )
}