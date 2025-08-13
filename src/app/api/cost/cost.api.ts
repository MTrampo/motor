import { formatCost } from "@/commons/models/Cost"
import globalResponses from "@/commons/utils/responses"
import { getCostByIdDocs } from "./cost.firestore"

const TEAM_ID = "CRFAZy0GNVARC8eAxjMG"

export const getCostById = async (documentId: string) => {
  // const authVerification = await getAuthenticatedUser()
  // if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)
    
  //const budgets = await getAllBudgetDocs(authVerification.decodedToken.uid)

  const cost = await getCostByIdDocs(TEAM_ID, documentId)
  if (!cost) return globalResponses.costNotFound(false)

  const formattedData = formatCost(cost)
  return globalResponses.costFound(formattedData)
}