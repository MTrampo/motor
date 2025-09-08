import { VehicleRequestBody } from "@/commons/models/Vehicle";
import { addVehicle, getAllVehicles } from "./vehicle.api"

export async function GET() {
  const result = await getAllVehicles()
  return Response.json(result)
}

export async function POST(request: Request) {
  const data: VehicleRequestBody = await request.json()

  const result = await addVehicle(data)
  return Response.json(result)
}