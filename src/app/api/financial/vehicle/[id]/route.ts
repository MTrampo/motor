import { withAuth } from "@/commons/lib/firebase/authentication"
import { getVehicleById } from "../vehicle.api"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async (session) => {
    const { id } = await params
    const teamId = session.selectedTeamId!;
    
    const result = await getVehicleById(teamId, id)
    return Response.json(result)
  })
}