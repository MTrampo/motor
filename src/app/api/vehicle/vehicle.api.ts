import { formatVehicle, formatVehicles } from "@/commons/models/Vehicle"
import { getAllVehiclesDocs, getVehicleByIdDocs } from "./vehicle.firestore"
import globalResponses from "@/commons/utils/responses"

const TEAM_ID = "CRFAZy0GNVARC8eAxjMG"

export const getVehicleById = async (documentId: string) => {
  // const authVerification = await getAuthenticatedUser()
  // if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)
    
  //const budgets = await getAllBudgetDocs(authVerification.decodedToken.uid)

  const vehicle = await getVehicleByIdDocs(TEAM_ID, documentId)
  if (!vehicle) return globalResponses.vehicleNotFound(false)

  const formattedData = formatVehicle(vehicle)
  return globalResponses.vehicleFound(formattedData)
}

export const getAllVehicles = async () => {
  // const authVerification = await getAuthenticatedUser()
  // if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)
    
  //const budgets = await getAllBudgetDocs(authVerification.decodedToken.uid)

  const vehicles = await getAllVehiclesDocs(TEAM_ID)
  if (!vehicles) return globalResponses.vehicleNotFound()

  const formattedData = formatVehicles(vehicles)
  return globalResponses.vehicleFound(formattedData)
}