'use client'

import { createContext, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { LoggedInUserFormatted, UserSignInFormInputs } from "@/commons/models/User";
import { FaEnvelopeCircleCheck, FaUserXmark } from "react-icons/fa6";
import { AuthError, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { firebase } from "@/commons/lib/firebase/client";
import { useRouter } from "next/navigation";
import { clearToken, setToken, verifyAndSetAuthenticatedUserToken } from "@/commons/lib/firebase/authentication";
import { ResponseFirebaseProps } from "@/commons/models/Api";
import { getFirebaseAuthErrorMessage } from "@/commons/validations/User";
import { HttpStatusEnum } from "@/commons/enums/Api";
import { useTriggerGetRegisteredUser } from "@/hooks/swr/use-user";
import { checkIfHaveTeamSelectedAndIfNotSelectOne, setTeamCookie } from "@/commons/lib/cookies";

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
  const router = useRouter()
  const [user, setUser] = useState<LoggedInUserFormatted | null>(null)

  const refreshIntervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const { triggerGetRegisteredUser } = useTriggerGetRegisteredUser()

  const signOutUser = useCallback(async () =>{
    await signOut(firebase.auth)
    await clearToken()
    setUser(null)
    router.push('/')
  }, [router])

  const handleUnauthenticatedUser = useCallback(async (title?: string, message?: string) => {
    if (refreshIntervalIdRef.current) {
      clearInterval(refreshIntervalIdRef.current)
      refreshIntervalIdRef.current = null
    }

    await signOutUser()

    // toast({
    //   icon: <FaUserXmark />,
    //   variant: 'destructive',
    //   title: title || 'Usuário Desconectado',
    //   description: message || 'Você foi desconectado. Por favor, faça login novamente.',
    // })
  }, [signOutUser])

  const executeSessionRefresh = useCallback(async (loggedInUser: User): Promise<boolean> => {
    try {
      const refreshIdToken = await loggedInUser.getIdToken(true)
      const isTokenUpdated = await verifyAndSetAuthenticatedUserToken(refreshIdToken)
      
      if (!isTokenUpdated) {
        handleUnauthenticatedUser(
          'Sessão Expirada', 
          'Não foi possível verificar sua sessão. Por favor, faça login novamente.'
        );
        
        return false;
      }

      return true
    } catch (error) {
      console.log('Erro ao atualizar a sessão:', error)
      handleUnauthenticatedUser(
        'Erro na Sessão', 
        'Não foi possível renovar sua sessão. Por favor, faça login novamente.'
      );
      return false;
    }
  }, [handleUnauthenticatedUser])

  const scheduleSessionRefresh = useCallback(() => {
    if (refreshIntervalIdRef.current) {
      clearInterval(refreshIntervalIdRef.current)
      refreshIntervalIdRef.current = null
    }

    refreshIntervalIdRef.current = setInterval(async () => {
      const currentUser = firebase.auth.currentUser
      if (currentUser) {
        await executeSessionRefresh(currentUser)
      } else {
        if (refreshIntervalIdRef.current) {
          clearInterval(refreshIntervalIdRef.current)
          refreshIntervalIdRef.current = null
        }
      }
    }, 50 * 60 * 1000); // A cada 50 minutos
  }, [executeSessionRefresh]);

  const getUserDataAndSetState = useCallback(async (loggedInUser: User) => {
    const refreshSuccess = await executeSessionRefresh(loggedInUser);
    if (!refreshSuccess) return

    const userFound = await triggerGetRegisteredUser()
    if (userFound?.status === HttpStatusEnum.UNAUTHORIZED || userFound.data === null) {
      await handleUnauthenticatedUser(userFound.title, userFound.message)
      return
    }

    console.log('usuário encontrado: ', userFound)

    if (userFound.data.teams && userFound.data.teams.length > 0)
      await checkIfHaveTeamSelectedAndIfNotSelectOne(userFound.data.teams[0].team.id)

    setUser(userFound.data)
    router.push('/dashboard')
    scheduleSessionRefresh()
  }, [executeSessionRefresh, handleUnauthenticatedUser, scheduleSessionRefresh, router])

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
    console.log('tentando logar com: ', data)
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
    
    const userCredential = await credential.data.user.getIdToken(true)
    const isTokenValid = await verifyAndSetAuthenticatedUserToken(userCredential)
    if (!isTokenValid) return await handleUnauthenticatedUser('Falha no Login', 'Não foi possível estabelecer sua sessão. Tente novamente.')

    const loggedInUser = await triggerGetRegisteredUser()

    if (loggedInUser?.status === HttpStatusEnum.UNAUTHORIZED || loggedInUser.data === null)
      return await handleUnauthenticatedUser(loggedInUser.title, loggedInUser?.message)

    if (loggedInUser.data.teams && loggedInUser.data.teams.length > 0)
      await checkIfHaveTeamSelectedAndIfNotSelectOne(loggedInUser.data.teams[0].team.id)
    
    setUser(loggedInUser.data)
    router.push('/dashboard')
  }, [handleUnauthenticatedUser, signInUserWithEmailAndPassword, router]);

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
        await getUserDataAndSetState(loggedInUser)
      } else {
        await handleUnauthenticatedUser()
      }
    })

    return () => {
      unsubscribe()
      if (refreshIntervalIdRef.current) {
        clearInterval(refreshIntervalIdRef.current)
        refreshIntervalIdRef.current = null
      }
    }
  }, [getUserDataAndSetState, handleUnauthenticatedUser])

  // TODO: Implementar lógica para cadastro de usuário
  // TODO: Implementar lógica para trabalhar com o mercado pago, criar planos e assinaturas para o usuário

  return (
    <UserContext.Provider value={{ user, signOutUser, handleSignInUser, handleUnauthenticatedUser, passwordResetRequest }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider