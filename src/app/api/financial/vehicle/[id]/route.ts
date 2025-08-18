import { getVehicleById } from "../vehicle.api"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getVehicleById(id)
  
  return Response.json(result)
}