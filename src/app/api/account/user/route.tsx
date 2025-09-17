import { NextRequest } from "next/server"
import { getLoggedInUserById } from "./user.api"

export async function GET(request: NextRequest) {
  const result = await getLoggedInUserById()
  return Response.json(result)
}

