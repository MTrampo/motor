import { withAuth } from "@/commons/lib/firebase/authentication";
import { getFinanceById, getQuarterlyFinanceComparison } from "./summary.api"

export async function GET() {
  return withAuth(async (session) => {
    const teamId = session.selectedTeamId!;

    const result = await getQuarterlyFinanceComparison(teamId)
    return Response.json(result)
  })
}