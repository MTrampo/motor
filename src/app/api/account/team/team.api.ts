import { getUserTeamsDoc } from "./team.firestore";

export const getTeamsFromLoggedInUser = async (userId: string) => {
  const userTeams = await getUserTeamsDoc(userId);
  return userTeams
}