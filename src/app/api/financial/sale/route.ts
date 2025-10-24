import { withAuth } from "@/commons/lib/firebase/authentication";
import { sellVehicle } from "./sale.api";
import { SellVehicleRequestBody } from "@/commons/models/Sale";

export async function POST(request: Request) {
  return withAuth(async (session) => {
    const teamId = session.selectedTeamId!;
    const data: SellVehicleRequestBody = await request.json()

    const result = await sellVehicle(teamId, data)
    return Response.json(result)
  })
}