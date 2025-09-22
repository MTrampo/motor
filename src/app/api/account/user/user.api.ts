import { formatUserAndTeams, UserFormatted, UserSession } from "@/commons/models/User"
import { HttpStatusEnum } from "@/commons/enums/Api"
import { ResponseProps } from "@/commons/models/Api"
import { getUserByIdDoc } from "./user.firestore"
import { getTeamsFromLoggedInUser } from "../team/team.api"

export const getLoggedInUserById = async (session: UserSession) => {
  const userId = session.decodedToken!.uid;

  const user = await getUserByIdDoc(userId)
  if (user === null) {
    const result: ResponseProps<null> = {
      status: HttpStatusEnum.NOT_FOUND,
      title: 'Assinatura não encontrada',
      message: 'Assinatura do usuário não encontrado, entre em contato com o suporte!',
      data: null
    }
    
    return result
  }

  const userTeams = await getTeamsFromLoggedInUser(userId)
  const formattedData = formatUserAndTeams(user, userTeams);
  
  const result: ResponseProps<UserFormatted> = {
    status: HttpStatusEnum.CREATED,
    title: 'Usuário encontrado',
    message: `Usuário encontrado com sucesso!`,
    data: formattedData
  }

  return result
}