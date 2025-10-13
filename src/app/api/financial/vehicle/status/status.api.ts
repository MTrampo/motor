import { VehicleStatusBody, VehicleStatusHistoryDocData, VehicleStatusHistoryRequestBody, VehicleSummaryDocData } from "@/commons/models/Vehicle";
import { addStatusHistoryDoc, getLatestXStatusDocs, updateCurrentStatusDoc } from "./status.firestore";
import { ResponseProps } from "@/commons/models/Api";
import { updateVehicleCurrentStatus } from "../vehicle.api";
import { CarStatusEnum } from "@/commons/enums/Car";

export const getLatestXStatus = async (teamId: string, plate: string, x: number) => {
  const statusHistory = await getLatestXStatusDocs(teamId, plate, x);
  return statusHistory;
}

export const addStatusHistory = async (teamId: string, vehicleStatus: VehicleStatusBody) => {
  const today = new Date()
  const dataDoc: VehicleStatusHistoryDocData = {
    plate: vehicleStatus.plate.toUpperCase(),
    endedAt: null,
    status: vehicleStatus.status,
    startedAt: new Date(vehicleStatus.startedAt),
    createdAt: today,
    updatedAt: today,
  }

  const id = await addStatusHistoryDoc(teamId, dataDoc);
  const result: ResponseProps<string> = {
    title: 'Marcha Engatada',
    message: `Marcha engatada com sucesso`,
    data: id
  }
  
  return result
}

export const addStatusHistoryAndUpdateCurrentStatus = async (teamId: string, body: VehicleStatusHistoryRequestBody) => {
  const today = new Date()
  const dataDoc: VehicleStatusHistoryDocData = {
    plate: body.plate.toUpperCase(),
    endedAt: null,
    status: body.newStatus,
    reason: body.reason?.toLowerCase(),
    startedAt: new Date(body.nextStatusStartDate),
    createdAt: today,
    updatedAt: today,
  }

  if (body.documentId) {
    const endedAt = new Date(body.endDatePreviousStatus) 
    await updateCurrentStatusDoc(teamId, body.documentId, endedAt);
  }

  const id = await addStatusHistoryDoc(teamId, dataDoc);
  await updateVehicleCurrentStatus(teamId, dataDoc.plate, dataDoc.status)
  const result: ResponseProps<string> = {
    title: 'Marcha Engatada',
    message: `Marcha engatada com sucesso`,
    data: id
  }
  
  return result
}