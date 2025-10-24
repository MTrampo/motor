import { VehicleRequestBody } from "@/commons/models/Vehicle";
import { addVehicle, getAllVehicles } from "./vehicle.api"
import { withAuth } from "@/commons/lib/firebase/authentication";
import { ApiCodeError } from "@/commons/errors/api";
import { InternalServerError } from "@/commons/errors/generic";

export async function GET() {
  return withAuth(async (session) => {
    try {
      const teamId = session.selectedTeamId!;

      const result = await getAllVehicles(teamId);
      return Response.json(result);
    } catch (error) {
      if (error instanceof ApiCodeError) {
        return Response.json(error.toJSON(), { status: error.status })
      }

      const internalError = new InternalServerError()
      return Response.json(internalError.toJSON(), { status: internalError.status })
    }
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