'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { FaPersonWalkingArrowRight  } from "react-icons/fa6";
import { UserSignInFormInputs } from "@/commons/models/User"; 
import { userSignInFormSchema } from "@/commons/validations/User";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { useUser } from "@/hooks/useUser";

export function SignInUserForm() {
  const { handleSignInUser } = useUser()
  const formUser = useForm<UserSignInFormInputs>({
    resolver: zodResolver(userSignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  return(
    <Form {...formUser}>
      <form className="space-y-3" onSubmit={formUser.handleSubmit(handleSignInUser)}>
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*********" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Button variant='default' className="w-full gap-3" onClick={() => {}}>
          ENTRAR <FaPersonWalkingArrowRight  className="h-5 w-5"/>
        </Button>
      </form>
    </Form>
  )
}