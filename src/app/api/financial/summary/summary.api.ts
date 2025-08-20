import { ResponseProps } from "@/commons/models/Api";
import { FinanceFormatted, formatFinance } from "@/commons/models/Finance";
import { getCurrentPeriod } from "@/commons/utils/generate-data";
import { getFinanceDocByPeriod } from "./summary.firestore";
import { HttpStatusEnum } from "@/commons/enums/Api";

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

// export async function processFinanceBasedBudget(userId: string, financeId: string, budgetDocData: BudgetDocData) {
//   const currentPeriodFinance = await ensureActiveFinanceForPeriod(userId, financeId, budgetDocData);
//   if (!currentPeriodFinance) return globalResponses.financeNotFound();

//   const result: ResponseProps<FinanceFormatted> = {
//     status: HttpStatusEnum.CREATED,
//     title: 'Atualizado',
//     message: `Finança atualizada com sucesso!`,
//     data: currentPeriodFinance
//   }

//   return result
// }

// export async function ensureActiveFinanceForPeriod(userId: string, financeId: string, budgetDocData: BudgetDocData | null = null) {
//   const currentPeriodFinance = await getActiveFinanceDocByPeriod(userId, financeId);
//   if (currentPeriodFinance) {
//     if (!budgetDocData) {
//       const formattedData = formatFinance(currentPeriodFinance)
//       return formattedData;
//     }

//     const today = new Date();
//     const updatedFinanceData: Partial<FinanceDocData> = {
//       budgetedAmount: currentPeriodFinance.budgetedAmount + budgetDocData.total,
//       budgetedCount: Math.max(currentPeriodFinance.budgetedCount + 1, 0),
//       lastBudget: today,
//       updatedAt: today,
//     };

//     const updatedFinanceId = await updateFinanceDoc(userId, financeId, updatedFinanceData);
//     const updatedCurrentPeriodFinace = await getFinanceDocByPeriod(userId, updatedFinanceId);
//     if (!updatedCurrentPeriodFinace) return null;

//     const formattedData = formatFinance(updatedCurrentPeriodFinace)
//     return formattedData;
//   }

//   await disablePreviousActiveFinance(userId, financeId);

//   const today = new Date();
//   const newFinanceData: FinanceDocData = {
//     period: financeId,
//     lastBudget: today,
//     lastService: new Date(0),
//     disabled: false,
//     budgetedCount: 1,
//     budgetedAmount: budgetDocData ? budgetDocData.total : 0,
//     servicesCount: 0,
//     servicesAmount: 0,
//     createdAt: today,
//     updatedAt: today,
//   };
  
//   const newFinanceId = await createFinanceDoc(userId, financeId, newFinanceData);
//   const newCurrentPeriodFinace = await getFinanceDocByPeriod(userId, newFinanceId);
//   if (!newCurrentPeriodFinace) return null;

//   const formattedData = formatFinance(newCurrentPeriodFinace)
//   return formattedData;
// };