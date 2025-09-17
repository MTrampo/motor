import { getAuthenticatedUser } from "@/commons/lib/firebase/authentication"
import globalResponses from "@/commons/utils/responses"

export const getTeamsThatUserMember = async () => {
  const authVerification = await getAuthenticatedUser()
  if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)

  
  // if (user === null) {
  //   const result: ResponseProps<null> = {
  //     status: HttpStatusEnum.NOT_FOUND,
  //     title: 'Assinatura não encontrada',
  //     message: 'Assinatura do usuário não encontrado, entre em contato com o suporte!',
  //     data: null
  //   }
    
  //   return result
  // }
  
  // const formattedData = formatUser(user)
  // const result: ResponseProps<UserFormatted> = {
  //   status: HttpStatusEnum.CREATED,
  //   title: 'Usuário encontrado',
  //   message: `Usuário encontrado com sucesso!`,
  //   data: formattedData
  // }

  // return result
}