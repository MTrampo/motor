import { ErrorCode } from "../enums/Api";

export const errorMessages: Record<ErrorCode, { title: string; message: string }> = {
  [ErrorCode.USER_NOT_FOUND]: {
    title: "Usuário não Encontrado",
    message: "Não conseguimos localizar o usuário, entre em contato com o suporte.",
  },
  [ErrorCode.VEHICLE_NOT_FOUND]: {
    title: "Veículo não Encontrado",
    message: "O veículo desejado não foi localizado.",
  },
  [ErrorCode.COST_NOT_FOUND]: {
    title: "Custo não Encontrado",
    message: "O custo desejado não foi localizado.",
  },
  [ErrorCode.FINANCE_NOT_FOUND]: {
    title: "Financeiro não Encontrado",
    message: "Erro ao recuperar informações financeiras.",
  },
  [ErrorCode.SUMMARY_NOT_FOUND]: {
    title: "Finança não Encontrada",
    message: "Nenhuma finança ativa encontrada para o período atual!"
  },
  [ErrorCode.SALE_NOT_FOUND]: {
    title: "Venda não Encontrada",
    message: "A venda desejada não foi localizada.",
  },
  [ErrorCode.BAD_REQUEST]: {
    title: 'Falha na solicitação',
    message: "Erro ao tentar processar solicitação"
  },
  [ErrorCode.UNAUTHORIZED]: {
    title: "Acesso não autorizado",
    message: "Você precisa estar autenticado para acessar este recurso.",
  },
  [ErrorCode.INTERNAL_ERROR]: {
    title: "Erro inesperado",
    message: "Algo deu errado, tente novamente mais tarde.",
  },
  [ErrorCode.FORBIDDEN]: {
    title: "Negado",
    message: "Autorização negada"
  }
};