import { formatVehicle, formatVehicles, formatVehiclesSummary, VehicleAuctionFormInputs, VehicleDocData, VehicleRequestBody, VehicleSummaryDocData, VehicleThirdFormInputs } from "@/commons/models/Vehicle"
import { addVehicleDoc, getAllVehiclesDocs, getAllVehiclesSummaryDocs, getVehicleByIdDocs } from "./vehicle.firestore"
import globalResponses from "@/commons/utils/responses"
import { CarOrigenEnum, CarStatusEnum } from "@/commons/enums/Car"
import { processFinanceBasedVehicle } from "../summary/summary.api"
import { ResponseProps } from "@/commons/models/Api"
import { HttpStatusEnum } from "@/commons/enums/Api"

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

  const vehicles = await getAllVehiclesSummaryDocs(TEAM_ID)
  if (!vehicles) return globalResponses.vehicleNotFound()

  const formattedData = formatVehiclesSummary(vehicles)
  return globalResponses.vehicleSummaryFound(formattedData)
}

export const addVehicle = async (data: VehicleRequestBody) => {
  // const authVerification = await getAuthenticatedUser()
  // if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)
  // const decodedToken = authVerification.decodedToken

  let docData: VehicleDocData
  if (data.origin === CarOrigenEnum.THIRD)
    docData = createDocDataVehicleThird(data.vehicleThird!)
  else
    docData = createDocDataVehicleAuction(data.VehicleAuction!)

  const vehicleId = await syncAndAddVehicle(data.documentId, docData)
  const result: ResponseProps<boolean> = {
    status: HttpStatusEnum.CREATED,
    title: 'Atualizado',
    message: `Finança atualizada com sucesso!`,
    data: vehicleId
  }

  return result
}

const createDocDataVehicleThird = (vehicle: VehicleThirdFormInputs) => {
  const today = new Date()

  const docData: VehicleDocData = {
    brand: vehicle.brand.toLowerCase(),
    model: vehicle.model.toLowerCase(),
    version: vehicle.version?.toLowerCase() || null,
    kilometers: vehicle.kilometers || null,
    chassis: vehicle.chassis?.toLowerCase() || null,
    color: vehicle.color,
    fipe: vehicle.fipe || null,
    status: CarStatusEnum.PURCHASED,
    modelYear: vehicle.modelYear,
    manufacturingYear: vehicle.manufacturingYear,
    conditionType: vehicle.conditionType,
    images: {
      purchased: [],
      ready: []
    },
    payment: {
      third: {
        name: vehicle.name.toLowerCase(),
        cpfCnpj: vehicle.cpfCnpj,
      },
      total: vehicle.paid,
      paymentDate: new Date(vehicle.paymentDate),
      notes: vehicle.notes?.toLowerCase()
    },
    createdAt: today,
    updatedAt: today
  }

  return docData
}

const createDocDataVehicleAuction = (vehicle: VehicleAuctionFormInputs) => {
  const today = new Date();

  const others = vehicle.others || 0;
  const administrative = vehicle.administrative || 0;
  const total = vehicle.bid + vehicle.commission + administrative + others;

  const docData: VehicleDocData = {
    brand: vehicle.brand.toLowerCase(),
    model: vehicle.model.toLowerCase(),
    version: vehicle.version?.toLowerCase() || null,
    kilometers: vehicle.kilometers || null,
    chassis: vehicle.chassis?.toLowerCase() || null,
    color: vehicle.color.toLowerCase(),
    fipe: vehicle.fipe || null,
    status: CarStatusEnum.PURCHASED,
    modelYear: vehicle.modelYear,
    manufacturingYear: vehicle.manufacturingYear,
    conditionType: vehicle.conditionType,
    images: {
      purchased: [],
      ready: []
    },
    payment: {
      auction: {
        name: vehicle.name.toLowerCase(),
        consignor: vehicle.consignor.toLowerCase(),
        code: vehicle.code,
        bid: vehicle.bid,
        commission: vehicle.commission,
        administrative,
        others,
        damageType: vehicle.damageType,
        functional: vehicle.functional,
      },
      total,
      paymentDate: new Date(vehicle.paymentDate),
      notes: vehicle.notes?.toLowerCase()
    },
    createdAt: today,
    updatedAt: today
  }

  return docData
}

const syncAndAddVehicle = async (documentId: string, data: VehicleDocData) => {
  const today = new Date();

  const vehicleSummaryDocData: VehicleSummaryDocData = {
    brand: data.brand.toLowerCase(),
    model: data.model.toLowerCase(),
    version: data.version?.toLowerCase() || data.model,
    color: data.color.toLowerCase(),
    status: data.status,
    kilometers: data.kilometers,
    hero: data.images?.purchased?.[0] || null,
    conditionType: data.conditionType,
    years: `${data.manufacturingYear}/${data.modelYear}`,
    totalCost: 0,
    totalPaid: data.payment.total,
    createdAt: today,
    updatedAt: today
  }

  const vehicleId = await addVehicleDoc(TEAM_ID, documentId, data, vehicleSummaryDocData);
  await processFinanceBasedVehicle(data.payment.total, data.payment.paymentDate);

  return vehicleId
}