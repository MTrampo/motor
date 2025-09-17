import { formatUser, formatUserAndTeams, UserFormatted } from "@/commons/models/User"
import { HttpStatusEnum } from "@/commons/enums/Api"
import { ResponseProps } from "@/commons/models/Api"
import { getUserByIdDoc } from "./user.firestore"
import globalResponses from "@/commons/utils/responses"
import { getAuthenticatedUser } from "@/commons/lib/firebase/authentication"
import { getUserTeams } from "../team/team.firestore"

export const getLoggedInUserById = async () => {
  const authVerification = await getAuthenticatedUser()
  if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)

  const user = await getUserByIdDoc(authVerification.decodedToken.uid)
  if (user === null) {
    const result: ResponseProps<null> = {
      status: HttpStatusEnum.NOT_FOUND,
      title: 'Assinatura não encontrada',
      message: 'Assinatura do usuário não encontrado, entre em contato com o suporte!',
      data: null
    }
    
    return result
  }

  const userTeams = await getUserTeams(authVerification.decodedToken.uid)
  const formattedData = formatUserAndTeams(user, userTeams)
  
  const result: ResponseProps<UserFormatted> = {
    status: HttpStatusEnum.CREATED,
    title: 'Usuário encontrado',
    message: `Usuário encontrado com sucesso!`,
    data: formattedData
  }

  return result
}