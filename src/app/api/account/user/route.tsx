import { getLoggedInUserById } from "./user.api"
import { withAuth } from "@/commons/lib/firebase/authentication"
import { ResponseProps } from "@/commons/models/Api"
import { UserFormatted } from "@/commons/models/User"
import { ApiCodeError } from "@/commons/errors/api"
import { InternalServerError } from "@/commons/errors/generic"

export async function GET() {
  return withAuth(async (session) => {
    try {
      const formattedData = await getLoggedInUserById(session)
      const result: ResponseProps<UserFormatted> = {
        title: 'Usuário encontrado',
        message: `Usuário encontrado com sucesso!`,
        data: formattedData
      }

      return Response.json(result)
    } catch (error) {
      if (error instanceof ApiCodeError) {
        return Response.json(error.toJSON(), { status: error.status })
      }

      const internalError = new InternalServerError()
      return Response.json(internalError.toJSON(), { status: internalError.status })
    }
  })
}

