import { withAuth } from "@/commons/lib/firebase/authentication";
import { getCostById } from "../cost.api"
import { ApiCodeError } from "@/commons/errors/api";
import { InternalServerError } from "@/commons/errors/generic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async (session) => {
    try {
      const teamId = session.selectedTeamId!;
      const { id } = await params
      
      const result = await getCostById(teamId, id)
      return Response.json(result)
    } catch (error) {
      if (error instanceof ApiCodeError) {
        return Response.json(error.toJSON(), { status: error.status })
      }

      const internalError = new InternalServerError()
      return Response.json(internalError.toJSON(), { status: internalError.status })
    }
  });
}