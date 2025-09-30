import { VehicleStatusHistoryDocData, VehicleStatusHistoryRequestBody } from "@/commons/models/Vehicle";
import { addStatusHistoryDoc, getLatestXStatusDocs, updateCurrentStatusDoc } from "./status.firestore";
import { ResponseProps } from "@/commons/models/Api";
import { HttpStatusEnum } from "@/commons/enums/Api";
import { updateVehicleCurrentStatus } from "../vehicle.api";

export const getLatestXStatus = async (teamId: string, plate: string, x: number) => {
  const statusHistory = await getLatestXStatusDocs(teamId, plate, x);
  return statusHistory;
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
    status: HttpStatusEnum.CREATED,
    title: 'Criado',
    message: `Marcha alterada!`,
    data: id
  }
  
  return result
}

