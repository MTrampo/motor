'use client'

import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { LoggedInUserFormatted, UserSignInFormInputs } from "@/commons/models/User";
import { AuthError, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { firebase } from "@/commons/lib/firebase/client";
import { clearAuthenticatedUserSession, createAuthenticatedUserSession } from "@/commons/lib/firebase/authentication";
import { ResponseFirebaseProps } from "@/commons/models/Api";
import { getFirebaseAuthErrorMessage } from "@/commons/validations/User";
import { HttpStatusEnum } from "@/commons/enums/Api";
import { useTriggerGetRegisteredUser } from "@/hooks/swr/use-user";
import { checkIfHaveTeamSelectedAndIfNotSelectOne } from "@/commons/lib/firebase/authentication";

type UserProviderProps = {
  children: ReactNode
}

type UserContextData = {
  user: LoggedInUserFormatted | null
  signOutUser: () => Promise<void>
  handleSignInUser: (data: UserSignInFormInputs) => Promise<void>
  passwordResetRequest: (email: string) => Promise<void>
  handleUnauthenticatedUser: (title?: string, message?: string) => Promise<void>
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

const UserProvider = ({ children }: UserProviderProps) => {  
  const [user, setUser] = useState<LoggedInUserFormatted | null>(null)
  const { triggerGetRegisteredUser } = useTriggerGetRegisteredUser()

  const clearUserCache = useCallback(async () => {
    if (!('serviceWorker' in navigator)) {
      return
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const serviceWorker = registration.active;

      if (!serviceWorker) {
        return
      }

      await new Promise<void>((resolve, reject) => {
        const messageChannel = new MessageChannel()
        const timeout = setTimeout(() => {
          console.error("Service Worker não respondeu a tempo.")
          reject(new Error("Service Worker timeout"))
        }, 5000)

        messageChannel.port1.onmessage = (event) => {
          clearTimeout(timeout)
          if (event.data && event.data.type === 'CACHE_CLEARED') {
              console.log('Cache limpo com sucesso.')
              resolve()
          } else {
            reject(new Error("Resposta do Service Worker inesperada."))
          }
        }

        serviceWorker.postMessage({ type: 'CACHE_CLEAR' }, [messageChannel.port2])
      })
    } catch (error) {
      console.log("Erro ao limpar o cache:", error)
    }
  }, [])

  const signOutUser = useCallback(async () => {
    await clearUserCache()
    await signOut(firebase.auth)
    await clearAuthenticatedUserSession(user?.id)
    setUser(null)
  }, [])

  const handleUnauthenticatedUser = useCallback(async (title?: string, message?: string) => {
    await signOutUser()

    // toast({
    //   icon: <FaUserXmark />,
    //   variant: 'destructive',
    //   title: title || 'Usuário Desconectado',
    //   description: message || 'Você foi desconectado. Por favor, faça login novamente.',
    // })
  }, [signOutUser])

  const getUserDataAndSyncSession = useCallback(async (loggedInUser: User) => {
    if (loggedInUser) {
      const idToken = await loggedInUser.getIdToken();
      const isSessionValid = await createAuthenticatedUserSession(idToken);
      if (!isSessionValid) {
        return await handleUnauthenticatedUser(
          "Falha na Sessão",
          "Não foi possível criar sua sessão. Faça login novamente."
        );
      }
    }

    const userFound = await triggerGetRegisteredUser()
    if (userFound?.status === HttpStatusEnum.UNAUTHORIZED || userFound.data === null) {
      return await handleUnauthenticatedUser(userFound.title, userFound.message)  
    }

    if (userFound.data.teams && userFound.data.teams.length > 0) {
      await checkIfHaveTeamSelectedAndIfNotSelectOne(userFound.data.teams[0].team.id)
    }

    setUser(userFound.data)
  }, [handleUnauthenticatedUser])

  const signInUserWithEmailAndPassword = useCallback(async (data: UserSignInFormInputs) => {
    try {
      const credential = await signInWithEmailAndPassword(firebase.auth, data.email, data.password)
      const result: ResponseFirebaseProps<UserCredential> = {
        data: credential,
        message: "Usuário autenticado com sucesso!",
      }

      return result
    } catch (error) {
      const authError = error as AuthError
      const result: ResponseFirebaseProps<null> = {
        data: null,
        message: getFirebaseAuthErrorMessage(authError.code),
      }

      return result
    }
  }, [])

  const handleSignInUser = useCallback(async (data: UserSignInFormInputs) => {
    const credential = await signInUserWithEmailAndPassword(data)
    if (credential.data === null) {
      // toast({
      //   icon: <FaUserXmark />,
      //   variant: 'destructive',
      //   title: 'Autorização Negada',
      //   description: credential.message,
      // })
      return
    }
    
    await getUserDataAndSyncSession(credential.data.user)

  }, [handleUnauthenticatedUser, signInUserWithEmailAndPassword]);

  const passwordResetRequest = useCallback(async (email: string) => {
    await sendPasswordResetEmail(firebase.auth, email)

    // toast({
    //   icon: <FaEnvelopeCircleCheck />,
    //   variant: 'constructive',
    //   title: 'E-mail Enviado',
    //   description: `Se conta com este e-mail existir, enviaremos um link para redefinir sua senha!`,
    // })
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, async (loggedInUser) => {
      if (loggedInUser) {
        await getUserDataAndSyncSession(loggedInUser)
      } else {
        await handleUnauthenticatedUser()
      }
    })

    return () => unsubscribe()
  }, [getUserDataAndSyncSession])

  // TODO: Implementar lógica para cadastro de usuário
  // TODO: Implementar lógica para trabalhar com o mercado pago, criar planos e assinaturas para o usuário

  return (
    <UserContext.Provider value={{ user, signOutUser, handleSignInUser, handleUnauthenticatedUser, passwordResetRequest }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider