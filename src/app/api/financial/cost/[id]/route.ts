import { withAuth } from "@/commons/lib/firebase/authentication";
import { getCostById } from "../cost.api"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async (session) => {
    const teamId = session.selectedTeamId!;
    const { id } = await params
    
    const result = await getCostById(teamId, id)
    return Response.json(result)
  });
}