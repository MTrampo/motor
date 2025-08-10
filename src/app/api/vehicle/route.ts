import { getAllVehicles } from "./vehicle.api"

export async function GET() {
  const result = await getAllVehicles()
  return Response.json(result)
}