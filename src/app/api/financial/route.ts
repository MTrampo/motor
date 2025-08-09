import { getFinanceById } from "./financial.api"

export async function GET() {
  const result = await getFinanceById()
  return Response.json(result)
}