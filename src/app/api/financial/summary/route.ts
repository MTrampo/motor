import { getFinanceById, getQuarterlyFinanceComparison } from "./summary.api"

export async function GET() {
  const result = await getQuarterlyFinanceComparison()
  return Response.json(result)
}