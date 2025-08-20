import uuid from "node:crypto"
import { CostDocData, CostItemDocData, CostRequestBody, formatCost } from "@/commons/models/Cost"
import globalResponses from "@/commons/utils/responses"
import { addCostDoc, addCostDocAndUpdateTotal, getCostByIdDocs } from "./cost.firestore"
import { ResponseProps } from "@/commons/models/Api"
import { HttpStatusEnum } from "@/commons/enums/Api"

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

export const addCost = async (data: CostRequestBody) => {
  // const authVerification = await getAuthenticatedUser()
  // if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)
  // const decodedToken = authVerification.decodedToken

  const id = await processAddNewCostOrNewCostItem(data);
  const result: ResponseProps<string> = {
    status: HttpStatusEnum.CREATED,
    title: 'Cadastrado',
    message: `Orçamento cadastrado com sucesso! 🤠`,
    data: id,
  }

  return result;
}

const processAddNewCostOrNewCostItem = async (data: CostRequestBody) => {
  const checkCostsExist = await getCostByIdDocs(TEAM_ID, data.documentId);
  if (checkCostsExist) {
    const docItemData: CostItemDocData[] = data.items.map(item => {
      return {
        guid: uuid.randomUUID(),
        type: item.type,
        description: item.description.toLowerCase(),
        value: item.value,
        paymentDate: new Date(item.paymentDate),
      }
    })

    const total = docItemData.reduce((acc, item) => acc + item.value, checkCostsExist.total)
    return await addCostDocAndUpdateTotal(TEAM_ID, data.documentId, docItemData, total)

  } else {
    const docData: CostDocData = {
      items: data.items.map(item => ({
        guid: uuid.randomUUID(),
        type: item.type,
        description: item.description.toLowerCase(),
        value: item.value,
        paymentDate: new Date(item.paymentDate),
      })),
      total: data.items.reduce((acc, item) => acc + item.value, 0),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return await addCostDoc(TEAM_ID, data.documentId, docData)
  }
}