import api from "@/commons/lib/fetcher/api"
import { CostRequestBody, RegisterCostFormInputs } from "@/commons/models/Cost"
import { VehicleStatusFormInputs, VehicleStatusHistoryRequestBody } from "@/commons/models/Vehicle"
import { toast } from "sonner"

export const addCost = async (plate: string, data: RegisterCostFormInputs[]) => {
  const requestBody: CostRequestBody = {
    documentId: plate,
    items: data.map(item => ({
      type: item.type,
      value: item.value,
      description: item.description,
      paymentDate: item.paymentDate,
    }))
  }

  return toast.promise((async () => {
    try {
      const response = await api<string, CostRequestBody>('/api/financial/cost', { 
        method: 'POST',
        body: requestBody 
      })
      return response
    } catch (error) {
      throw new Error('Erro ao tentar adicionar um novo custo')
    }
  })(),
  {
    loading: 'Adicionando Custos...',
    success: 'Custos adicionados com sucesso!',
      error: (err) => `${err.message}`
  })
}

// export const killCost = async (plate: string, guid: string) => {
  

//   return toast.promise((async () => {
//     try {
//       const response = await api<string, CostRequestBody>('/api/financial/cost', { 
//         method: 'DELETE',
//         body: requestBody 
//       })
//       return response
//     } catch (error) {
//       throw new Error('Erro ao tentar excluir um novo custo')
//     }
//   })(),
//   {
//     loading: 'Adicionando Custos...',
//     success: 'Custos adicionados com sucesso!',
//       error: (err) => `${err.message}`
//   })
// }

export const updatedStatus = async (lasDocumentId: string | null, plate: string, data: VehicleStatusFormInputs) => {
  const requestBody: VehicleStatusHistoryRequestBody = {
    plate,
    documentId: lasDocumentId,
    endDatePreviousStatus: data.endDatePreviousStatus,
    newStatus: data.newStatus,
    nextStatusStartDate: data.nextStatusStartDate,
    reason: data.reason
  }

  return toast.promise((async () => {
    try {
      const response = await api<string, VehicleStatusHistoryRequestBody>('/api/financial/vehicle/status', { 
        method: 'POST',
        body: requestBody 
      })
      return response
    } catch (error) {
      throw new Error('Erro ao tentar adicionar um novo custo')
    }
  })(),
  {
    loading: 'Alterando Marcha...',
    success: 'Marcha alterada com sucesso!',
      error: (err) => `${err.message}`
  })
}