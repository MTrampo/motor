import { ResponseProps } from "../models/Api"
import { VehicleFormatted, VehicleSummaryFormatted } from "../models/Vehicle"
import { CostFormatted } from "../models/Cost"
import { VehicleSoldFormatted } from "../models/Sale"

const globalResponses = {
  costFound: (
    formattedData: CostFormatted,
    isPlural = true
  ): ResponseProps<CostFormatted> => ({
    title: isPlural ? 'Custos Encontrados' : 'Custo Encontrado',
    message: isPlural ? 'Custos dos veículo encontrados' : 'Custo do veículo desejado encontrado',
    data: formattedData
  }),
  vehicleFound: (
    formattedData: VehicleFormatted | VehicleFormatted[],
    isPlural = true
  ): ResponseProps<VehicleFormatted | VehicleFormatted[]> => ({
    title: isPlural ? 'Veículos Encontrados' : 'Veículo Encontrado',
    message: isPlural ? 'Veículos recuperados com sucesso' : 'Veículo recuperado com sucesso',
    data: formattedData
  }),
  vehicleSummaryFound: (
    formattedData: VehicleSummaryFormatted | VehicleSummaryFormatted[],
    isPlural = true
  ): ResponseProps<VehicleSummaryFormatted | VehicleSummaryFormatted[]> => ({
    title: isPlural ? 'Veículos Encontrados' : 'Veículo Encontrado',
    message: isPlural ? 'Veículos recuperados com sucesso' : 'Veículo recuperado com sucesso',
    data: formattedData
  }),
  soldFound: (
    formattedData: VehicleSoldFormatted | VehicleSoldFormatted[],
    isPlural = true
  ): ResponseProps<VehicleSoldFormatted | VehicleSoldFormatted[]> => ({
    title: isPlural ? 'Vendas Encontradas' : 'Vendas Encontrada',
    message: isPlural ? 'Vendas recuperadas com sucesso' : 'Vendas recuperada com sucesso',
    data: formattedData
  }),
}

export default globalResponses