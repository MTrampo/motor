'use client'

import { Suspense, useState } from "react";
import { SignInUserForm } from "@/components/forms/User/sign-in-user-form"
import { ForgotPasswordForm } from "@/components/forms/User/forgot-password-form";


export default function SignIn() {
  const [forgotPassword, setForgotPassword] = useState(false)

  return (
    <main className="grid grid-cols-1 xl:grid-cols-2 h-[100vh] justify-around">
      <div className="hidden xl:block bg-[url('/imgs/hero-cars.png')] w-full bg-cover bg-no-repeat"/>
      <div className="bg-[url('/imgs/hero-cars.png')] bg-contain bg-repeat-round xl:bg-none flex items-center justify-center px-2 xl:p-10">
        <div className="bg-white md:bg-gray-100/90 xl:bg-background p-6 xl:p-0 rounded-xl mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
          <div className="space-y-3">
            <h1 className="text-center uppercase text-xl font-bold">
              {forgotPassword ? 'Recupere a sua garagem' : 'Entre na sua garagem'}
            </h1>
            <p className="text-justify">
              {forgotPassword ? 
                'Esqueceu a senha? Não se preocupe, é só inserir seu e-mail que vamos te ajudar a recuperar o acesso.'
              : 
                'Pronto para organizar sua garagem? Entre e dê a partida na sua jornada.'
              }
            </p>
          </div>

          <Suspense>
            {forgotPassword ? (
              <ForgotPasswordForm />
            ) : (
              <SignInUserForm />
            )}
          </Suspense>
          
          <>
            {forgotPassword ? (
              <p className="text-center">
                Lembrou da senha?{' '}
                <span className="text-blue-500 hover:text-blue-400 font-bold cursor-pointer" onClick={() => setForgotPassword(false)}>
                  Clique aqui para entrar
                </span>
              </p>
            ) : (
              <p className="text-center">
                Esqueceu a senha?{' '}
                <span className="text-blue-500 hover:text-blue-400 font-bold cursor-pointer" onClick={() => setForgotPassword(true)}>
                  Clique aqui para recuperar
                </span>
              </p>
            )}
          </>

          {/* <div className="mt-auto">
            <Separator className="my-4" />
            <p className="text-center mt-auto">
              Pronto para assumir o volante?{' '}
              <span className="text-blue-500 hover:text-blue-400 font-bold">
                Comece um teste gratuito de 15 dias
              </span>
            </p>
          </div> */}
        </div>
      </div>
    </main>
  );
}
