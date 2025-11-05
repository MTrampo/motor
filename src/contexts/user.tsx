'use client'

import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { LoggedInUserFormatted, UserSignInFormInputs } from "@/commons/models/User";
import { AuthError, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { firebase } from "@/commons/lib/firebase/client";
import { clearAuthenticatedUserSession, createAuthenticatedUserSession, setTeamCookie } from "@/commons/lib/firebase/authentication";
import { ResponseFirebaseProps } from "@/commons/models/Api";
import { getFirebaseAuthErrorMessage } from "@/commons/validations/User";
import { useTriggerGetRegisteredUser } from "@/hooks/swr/use-user";
import { checkIfHaveTeamSelectedAndIfNotSelectOne } from "@/commons/lib/firebase/authentication";
import { TeamMemberFormatted } from "@/commons/models/Team";
import { clearServiceWorkerCache } from "@/pwa/register-sw";
import { toast } from "sonner";

type UserProviderProps = {
  children: ReactNode
}

type UserContextData = {
  user: LoggedInUserFormatted | null
  activeTeam: TeamMemberFormatted | null
  signOutUser: () => Promise<void>
  selectTeam: (selectedTeamId: string) => Promise<void>
  passwordResetRequest: (email: string) => Promise<void>
  handleSignInUser: (data: UserSignInFormInputs) => Promise<void>
  handleUnauthenticatedUser: (title?: string, message?: string) => Promise<void>
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

const UserProvider = ({ children }: UserProviderProps) => {  
  const [user, setUser] = useState<LoggedInUserFormatted | null>(null)
  const [activeTeam, setActiveTeam] = useState<TeamMemberFormatted | null>(null)
  const { triggerGetRegisteredUser } = useTriggerGetRegisteredUser()

  const toastUnauthenticatedUser = (title?: string, message?: string) => {
    toast.info(title || "Sessão Expirada", {
      description: message || "Por favor, faça login novamente para continuar.",
    });
  }

  const clearUserCache = useCallback(async () => {
    await clearServiceWorkerCache()
  }, [activeTeam]) 

  const signOutUser = useCallback(async () => {
    await clearUserCache()
    await signOut(firebase.auth)
    await clearAuthenticatedUserSession(user?.id)
    setUser(null)
  }, [])

  const selectTeam = async (selectedTeamId: string) => {
    await clearUserCache()
    await setTeamCookie(selectedTeamId)
    const selectedTeam = user?.teams?.find(team => team.team.id === selectedTeamId) ?? null
    setActiveTeam(selectedTeam)
  }

  const handleUnauthenticatedUser = useCallback(async (title?: string, message?: string) => {
    await signOutUser()
  }, [signOutUser])

  const getUserDataAndSyncSession = useCallback(async (loggedInUser: User) => {
    if (loggedInUser) {
      const idToken = await loggedInUser.getIdToken();
      const isSessionValid = await createAuthenticatedUserSession(idToken);
      if (!isSessionValid) {
        await handleUnauthenticatedUser()
        return toastUnauthenticatedUser(
          "Falha na Sessão",
          "Não foi possível criar sua sessão. Faça login novamente."
        );
      }
    }

    const userFound = await triggerGetRegisteredUser()
    if (userFound?.data === null) {
      await handleUnauthenticatedUser()
      return toastUnauthenticatedUser(userFound.title, userFound.message)  
    }

    if (userFound.data.teams && userFound.data.teams.length > 0) {
      const teamId = await checkIfHaveTeamSelectedAndIfNotSelectOne(userFound.data.teams[0].team.id)
      const selectedTeam = userFound.data.teams.find(team => team.team.id === teamId) ?? null
      setActiveTeam(selectedTeam)
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
    <UserContext.Provider value={{ 
      user, activeTeam, signOutUser, selectTeam, handleSignInUser, handleUnauthenticatedUser, passwordResetRequest
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider