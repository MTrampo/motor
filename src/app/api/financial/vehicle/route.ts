import { VehicleRequestBody } from "@/commons/models/Vehicle";
import { addVehicle, getAllVehicles } from "./vehicle.api"
import { withAuth } from "@/commons/lib/firebase/authentication";

export async function GET() {
  return withAuth(async (session) => {
    const teamId = session.selectedTeamId!;

    const result = await getAllVehicles(teamId);
    return Response.json(result);
  })
}

export async function POST(request: Request) {
  return withAuth(async (session) => {
    const teamId = session.selectedTeamId!;
    const data: VehicleRequestBody = await request.json()

    const result = await addVehicle(teamId, data)
    return Response.json(result)
  })
}