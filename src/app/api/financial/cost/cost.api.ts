import uuid from "node:crypto"
import { CostDocData, CostItemDocData, CostRequestBody, formatCost } from "@/commons/models/Cost"
import globalResponses from "@/commons/utils/responses"
import { addCostDoc, addCostDocAndUpdateTotal, getCostByIdDocs, killCostDoc } from "./cost.firestore"
import { ResponseProps } from "@/commons/models/Api"
import { HttpStatusEnum } from "@/commons/enums/Api"
import { addAndSynchronizeVehicleFinances, removeAndSynchronizeVehicleFinances } from "../summary/summary.api"
import { FinanceTypeEnum } from "@/commons/enums/Finance"

export const getCostById = async (teamId: string, documentId: string) => {
  const cost = await getCostByIdDocs(teamId, documentId)
  if (!cost) return globalResponses.costNotFound(false)

  const formattedData = formatCost(cost)
  return globalResponses.costFound(formattedData)
}

export const addCost = async (teamId: string, data: CostRequestBody) => {
  const id = await processAddNewCostOrNewCostItem(teamId, data);
  const result: ResponseProps<string> = {
    status: HttpStatusEnum.CREATED,
    title: 'Cadastrado',
    message: `Custo cadastrado com sucesso!`,
    data: id,
  }

  return result;
}

export const killCost = async (teamId: string, data: CostRequestBody) => {
  const oldDoc = await getCostByIdDocs(teamId, data.documentId);
  if (!oldDoc) return null;

  const today = new Date()
  const oldDocItem = oldDoc.items.find(item => item.guid === data.guidItem)!;
  const total = oldDoc.total - oldDocItem.value;

  const id = await killCostDoc(teamId, data.documentId, oldDocItem, total);
  await removeAndSynchronizeVehicleFinances(teamId, {
    plate: oldDoc.id,
    payment: oldDocItem.value,
    cost: total,
    paymentDate: today,
    type: FinanceTypeEnum.COST
  });

  const result: ResponseProps<string> = {
    status: HttpStatusEnum.CREATED,
    title: 'Cadastrado',
    message: `Orçamento cadastrado com sucesso! 🤠`,
    data: id,
  }

  return result;
}

const processAddNewCostOrNewCostItem = async (teamId: string, data: CostRequestBody) => {
  const checkCostsExist = await getCostByIdDocs(teamId, data.documentId);
  if (checkCostsExist) {
    const docItemData: CostItemDocData[] = data.items!.map(item => {
      return {
        guid: uuid.randomUUID(),
        type: item.type,
        description: item.description.toLowerCase(),
        value: item.value,
        paymentDate: new Date(item.paymentDate),
      }
    })

    const paymentDate = docItemData.map(item => item.paymentDate).sort((a, b) => b.getTime() - a.getTime())[0];
    const totalItems = docItemData.reduce((acc, item) => acc + item.value, 0);
    const total = (totalItems + checkCostsExist.total);
    
    const id = await addCostDocAndUpdateTotal(teamId, data.documentId, docItemData, total);
    await addAndSynchronizeVehicleFinances(teamId, {
      plate: checkCostsExist.id,
      payment: totalItems,
      cost: total,
      countItems: docItemData.length,
      paymentDate,
      type: FinanceTypeEnum.COST
    });
    
    return id;
  } else {
    const docData: CostDocData = {
      items: data.items!.map(item => ({
        guid: uuid.randomUUID(),
        type: item.type,
        description: item.description.toLowerCase(),
        value: item.value,
        paymentDate: new Date(item.paymentDate),
      })),
      total: data.items!.reduce((acc, item) => acc + item.value, 0),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const id = await addCostDoc(teamId, data.documentId, docData)
    
    const paymentDate = docData.items.map(item => item.paymentDate).sort((a, b) => b.getTime() - a.getTime())[0];
    await addAndSynchronizeVehicleFinances(teamId, {
      plate: data.documentId,
      payment: docData.total,
      paymentDate,
      countItems: docData.items.length,
      type: FinanceTypeEnum.COST
    });

    return id;
  }
}