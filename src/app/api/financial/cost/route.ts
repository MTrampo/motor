import { CostRequestBody } from "@/commons/models/Cost"
import { addCost, killCost } from "./cost.api"
import { withAuth } from "@/commons/lib/firebase/authentication"

export async function POST(request: Request) {
  return withAuth(async (session) => {
    const teamId = session.selectedTeamId!;
    const data: CostRequestBody = await request.json()

    const result = await addCost(teamId, data)
    return Response.json(result)
  })
}

export async function DELETE(request: Request) {
  return withAuth(async (session) => {
    const teamId = session.selectedTeamId!;
    const data: CostRequestBody = await request.json()

    const result = await killCost(teamId, data)
    return Response.json(result)
  })

  
}