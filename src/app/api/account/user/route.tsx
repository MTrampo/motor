import { NextRequest } from "next/server"
import { getLoggedInUserById } from "./user.api"
import { withAuth } from "@/commons/lib/firebase/authentication"

export async function GET(request: NextRequest) {
  return withAuth(async (session) => {
    const result = await getLoggedInUserById(session)
    return Response.json(result)
  })
  
  
}

