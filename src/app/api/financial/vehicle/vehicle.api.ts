import { formatVehicle, formatVehiclesSummary, VehicleAuctionFormInputs, VehicleDocData, VehicleRequestBody, VehicleSummaryDocData, VehicleThirdFormInputs } from "@/commons/models/Vehicle"
import { addVehicleDoc, getAllVehiclesSummaryDocs, getVehicleByIdDocs, updateCurrentStatusDoc, updateVehicleCostDoc } from "./vehicle.firestore"
import globalResponses from "@/commons/utils/responses"
import { CarOrigenEnum, CarStatusEnum } from "@/commons/enums/Car"
import { addFinanceAccordingToTypeRequested } from "../summary/summary.api"
import { ResponseProps } from "@/commons/models/Api"
import { ErrorCode, HttpStatusEnum } from "@/commons/enums/Api"
import { FinanceTypeEnum } from "@/commons/enums/Finance"
import { getLatestXStatus } from "./status/status.api"
import { NotFound } from "@/commons/errors/generic"


export const getVehicleById = async (teamId: string, documentId: string) => {
  const vehicle = await getVehicleByIdDocs(teamId, documentId);
  if (!vehicle) throw new NotFound(ErrorCode.VEHICLE_NOT_FOUND);

  const statusHistory = await getLatestXStatus(teamId, vehicle.id, 5)
  const formattedData = formatVehicle(vehicle, statusHistory);
  
  return globalResponses.vehicleFound(formattedData);
}

export const getAllVehicles = async (teamId: string) => {
  const vehicles = await getAllVehiclesSummaryDocs(teamId)
  if (!vehicles) throw new NotFound(ErrorCode.VEHICLE_NOT_FOUND)

  const formattedData = formatVehiclesSummary(vehicles)
  return globalResponses.vehicleSummaryFound(formattedData)
}

export const addVehicle = async (teamId: string, data: VehicleRequestBody) => {
  let docData: VehicleDocData
  if (data.origin === CarOrigenEnum.THIRD)
    docData = createDocDataVehicleThird(data.vehicleThird!)
  else
    docData = createDocDataVehicleAuction(data.VehicleAuction!)

  const vehicleId = await syncAndAddVehicle(teamId, data.documentId, docData)
  const result: ResponseProps<boolean> = {
    title: 'Atualizado',
    message: `Finança atualizada com sucesso!`,
    data: vehicleId
  }

  return result
}

export const updateVehicleCost = async (teamId: string, documentId: string, value: number) => {
  await updateVehicleCostDoc(teamId, documentId, value);
}

export const updateVehicleCurrentStatus = async (teamId: string, documentId: string, status: CarStatusEnum) => {
  await updateCurrentStatusDoc(teamId, documentId, status);
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

const syncAndAddVehicle = async (teamId: string, documentId: string, data: VehicleDocData) => {
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

  const vehicleId = await addVehicleDoc(teamId, documentId, data, vehicleSummaryDocData);
  await addFinanceAccordingToTypeRequested(teamId, data.payment.total, data.payment.paymentDate, FinanceTypeEnum.PURCHASED);

  return vehicleId
}