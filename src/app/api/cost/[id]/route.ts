import { getCostById } from "../cost.api"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getCostById(id)
  
  return Response.json(result)
}