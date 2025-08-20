import { getFinanceById } from "./summary.api"

export async function GET() {
  const result = await getFinanceById()
  return Response.json(result)
}