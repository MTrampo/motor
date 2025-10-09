import { formatUserAndTeams, UserSession } from "@/commons/models/User"
import { getUserByIdDoc } from "./user.firestore"
import { getTeamsFromLoggedInUser } from "../team/team.api"
import { NotFound } from "@/commons/errors/generic";
import { ErrorCode } from "@/commons/enums/Api";

export const getLoggedInUserById = async (session: UserSession) => {
  const userId = session.decodedToken!.uid;

  const user = await getUserByIdDoc(userId)
  if (user === null) throw new NotFound(ErrorCode.USER_NOT_FOUND);

  const userTeams = await getTeamsFromLoggedInUser(userId)
  const formattedData = formatUserAndTeams(user, userTeams);
  return formattedData
}