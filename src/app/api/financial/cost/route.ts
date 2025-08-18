import { CostRequestBody } from "@/commons/models/Cost"
import { addCost } from "./cost.api"

export async function POST(request: Request) {
  const data: CostRequestBody = await request.json()

  const result = await addCost(data)
  return Response.json(result)
}