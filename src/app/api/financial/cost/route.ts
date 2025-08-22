import { CostRequestBody } from "@/commons/models/Cost"
import { addCost, killCost } from "./cost.api"

export async function POST(request: Request) {
  const data: CostRequestBody = await request.json()

  const result = await addCost(data)
  return Response.json(result)
}

export async function DELETE(request: Request) {
  const data: CostRequestBody = await request.json()
  
  const result = await killCost(data)
  return Response.json(result)
}