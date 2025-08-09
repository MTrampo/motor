import { HttpStatusEnum } from "@/commons/enums/Api";
import { ResponseProps } from "@/commons/models/Api";
import { FinanceFormatted, formatFinance } from "@/commons/models/Finance";
import { getCurrentPeriod } from "@/commons/utils/data";
import { getFinanceDocByPeriod } from "./financial.firestore";

const TEAM_ID = "CRFAZy0GNVARC8eAxjMG"

export const getFinanceById = async (): Promise<ResponseProps<FinanceFormatted | null>> => {
  // const authVerification = await getAuthenticatedUser()
  // if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)

  const periodId = getCurrentPeriod();
  const finance = await getFinanceDocByPeriod(TEAM_ID, periodId);

  if (!finance) {
      return {
        status: HttpStatusEnum.NOT_FOUND,
        title: 'Finança não Encontrada',
        message: 'Nenhuma finança ativa encontrada para o período atual!',
        data: null
      };
  }

  const formattedData = formatFinance(finance);
  return {
    status: HttpStatusEnum.OK,
    title: 'Finança Encontrada',
    message: 'Finança recuperada com sucesso!',
    data: formattedData
  };
};