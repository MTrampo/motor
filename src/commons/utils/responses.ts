import { ResponseProps } from "../models/Api"
import { getFirebaseAuthErrorMessage } from "../validations/User"
import { VehicleFormatted, VehicleSummaryFormatted } from "../models/Vehicle"
import { HttpStatusEnum } from "../enums/Api"
import { CostFormatted } from "../models/Cost"

const globalResponses = {
  unauthorizedUser: (code: string): ResponseProps<null> => ({
    title: 'Usuário não autenticado',
    message: getFirebaseAuthErrorMessage(code),
    data: null
  }),
  costNotFound: (isPlural = true): ResponseProps<null> => ({
    title: isPlural ? 'Custos dos Veículo não Encontrados' : 'Custo do Veículo não Encontrado',
    message: isPlural ? 'Nenhum custo encontrado' : 'Custo do veículo desejado não encontrado',
    data: null
  }),
  vehicleNotFound: (isPlural = true): ResponseProps<null> => ({
    title: isPlural ? 'Veículos não Encontrados' : 'Veículo não Encontrado',
    message: isPlural ? 'Nenhum veículo encontrado' : 'Veículo desejado não encontrado',
    data: null
  }),
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
  // budgetPageFound: (
  //   pageData: ReturnPageBudgets,
  //   isPlural = true
  // ): ResponseProps<ReturnPageBudgets> => ({
  //
  //   title: isPlural ? 'Orçamentos Encontrados' : 'Orçamento Encontrado',
  //   message: isPlural ? 'Orçamentos recuperados com sucesso' : 'Orçamento recuperado com sucesso',
  //   data: pageData
  // }),

  financeNotFound: (): ResponseProps<null> => ({
    title: 'Financeiro não encontrado',
    message: 'Erro ao recuperar financeiro.',
    data: null
  })
}

export default globalResponses