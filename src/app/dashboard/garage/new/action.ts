import { toast } from "sonner"
import api from "@/commons/lib/fetcher/api"
import { VehicleAuctionFormInputs, VehicleMainFormInputs, VehicleRequestBody, VehicleThirdFormInputs } from "@/commons/models/Vehicle"
import { CarOrigenEnum } from "@/commons/enums/Car"


export const addVehicle = async (data: VehicleMainFormInputs) => {
  const origin = Number(data.origin)
  const requestBody: VehicleRequestBody = {
    documentId: data.licensePlate,
    origin,
    vehicleThird: origin === CarOrigenEnum.THIRD ? data as VehicleThirdFormInputs : null,
    VehicleAuction: origin === CarOrigenEnum.AUCTION ? data as VehicleAuctionFormInputs : null,
  }

  return toast.promise((async () => {
    try {
      const response = await api<string, VehicleRequestBody>('/api/financial/vehicle', { 
        method: 'POST',
        body: requestBody 
      })
      return response
    } catch (error) {
      throw new Error('Erro ao tentar adicionar um novo veículo')
    }
  })(),
  {
    loading: 'Adicionando Veículo...',
    success: 'Veículo adicionado com sucesso!',
      error: (err) => `${err.message}`
  })
}