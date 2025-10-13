import { withAuth } from "@/commons/lib/firebase/authentication";
import { VehicleStatusHistoryRequestBody } from "@/commons/models/Vehicle";
import { addStatusHistoryAndUpdateCurrentStatus } from "./status.api";

export async function PUT(request: Request) {
  return withAuth(async (session) => {
    const teamId = session.selectedTeamId!;
    const data: VehicleStatusHistoryRequestBody = await request.json()

    const result = await addStatusHistoryAndUpdateCurrentStatus(teamId, data)
    return Response.json(result)
  })
}