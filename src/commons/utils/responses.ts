import { ResponseProps } from "../models/Api"
import { getFirebaseAuthErrorMessage } from "../validations/User"
import { VehicleFormatted } from "../models/Vehicle"
import { HttpStatusEnum } from "../enums/Api"

const globalResponses = {
  unauthorizedUser: (code: string): ResponseProps<null> => ({
    status: HttpStatusEnum.UNAUTHORIZED,
    title: 'Usuário não autenticado',
    message: getFirebaseAuthErrorMessage(code),
    data: null
  }),

  vehicleNotFound: (isPlural = true): ResponseProps<null> => ({
    status: HttpStatusEnum.NOT_FOUND,
    title: isPlural ? 'Veículos não Encontrados' : 'Veículo não Encontrado',
    message: isPlural ? 'Nenhum veículo encontrado' : 'Veículo desejado não encontrado',
    data: null
  }),

  vehicleFound: (
    formattedData: VehicleFormatted | VehicleFormatted[],
    isPlural = true
  ): ResponseProps<VehicleFormatted | VehicleFormatted[]> => ({
    status: HttpStatusEnum.OK,
    title: isPlural ? 'Veículos Encontrados' : 'Veículo Encontrado',
    message: isPlural ? 'Veículos recuperados com sucesso' : 'Veículo recuperado com sucesso',
    data: formattedData
  }),

  // budgetPageFound: (
  //   pageData: ReturnPageBudgets,
  //   isPlural = true
  // ): ResponseProps<ReturnPageBudgets> => ({
  //   status: HttpStatusEnum.OK,
  //   title: isPlural ? 'Orçamentos Encontrados' : 'Orçamento Encontrado',
  //   message: isPlural ? 'Orçamentos recuperados com sucesso' : 'Orçamento recuperado com sucesso',
  //   data: pageData
  // }),

  financeNotFound: (): ResponseProps<null> => ({
    status: HttpStatusEnum.UNAUTHORIZED,
    title: 'Financeiro não encontrado',
    message: 'Erro ao recuperar financeiro.',
    data: null
  })
}

export default globalResponses