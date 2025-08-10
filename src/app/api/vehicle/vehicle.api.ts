import { formatVehicles } from "@/commons/models/Vehicle"
import { getAllVehiclesDocs } from "./vehicle.firestore"
import globalResponses from "@/commons/utils/responses"

const TEAM_ID = "CRFAZy0GNVARC8eAxjMG"

export const getAllVehicles = async () => {
  // const authVerification = await getAuthenticatedUser()
  // if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)
    
  //const budgets = await getAllBudgetDocs(authVerification.decodedToken.uid)
  //if (budgets.length === 0) return globalResponses.budgetNotFound()

  const vehicles = await getAllVehiclesDocs(TEAM_ID)

  const formattedData = formatVehicles(vehicles)
  return globalResponses.vehicleFound(formattedData)
}