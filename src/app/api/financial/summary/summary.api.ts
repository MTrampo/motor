import { ResponseProps } from "@/commons/models/Api";
import { FinanceDocData, FinanceFirestore, formatFinance, formatFinanceWithComparison } from "@/commons/models/Finance";
import { getCurrentPeriod } from "@/commons/utils/generate-data";
import { createFinanceDoc, getFinanceDocByPeriod, getFinanceDocByFlexibleOrFixedPeriods, updateFinanceDoc } from "./summary.firestore";
import { HttpStatusEnum } from "@/commons/enums/Api";
import { FinanceTypeEnum } from "@/commons/enums/Finance";
import { getFinancialValuesByTypeFactory } from "./summary.factory";
import { endOfQuarter, startOfQuarter, subMonths, subQuarters } from "date-fns";

const TEAM_ID = "CRFAZy0GNVARC8eAxjMG"

export const getFinanceById = async () => {
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
}

export const getQuarterlyFinanceComparison = async () => {
  const today = new Date();

  // Define o período atual (trimestre)
  const currentQuarterStart = startOfQuarter(today);
  const currentQuarterEnd = endOfQuarter(today);

  // Busca os dados do trimestre atual
  const currentData = await getFinanceDocByFlexibleOrFixedPeriods(TEAM_ID, currentQuarterStart, currentQuarterEnd);
  if (!currentData) {
    return {
      status: HttpStatusEnum.NOT_FOUND,
      title: 'Finança não Encontrada',
      message: 'Nenhuma finança ativa encontrada para o período atual!',
      data: null
    };
  }

  // Define o período anterior (trimestre)
  const previousQuarterStart = startOfQuarter(subQuarters(today, 1));
  const previousQuarterEnd = endOfQuarter(subQuarters(today, 1));

  // Busca os dados do trimestre anterior
  const previousData = await getFinanceDocByFlexibleOrFixedPeriods(TEAM_ID, previousQuarterStart, previousQuarterEnd);


  // Agrega os dados do trimestre atual e anterior
  const currentSummary = aggregateFinances(currentData);
  const previousSummary = previousData ? aggregateFinances(previousData) : null;

  // Formata os dados agregados
  const formattedData = formatFinanceWithComparison(currentSummary, previousSummary);

  return {
    status: HttpStatusEnum.OK,
    title: 'Finanças do Trimestre',
    message: 'Comparativo de finanças gerado com sucesso!',
    data: formattedData
  };
}

export const getFinanceByFlexiblePeriods = async (months: number) => {
  const today = new Date();
  const startDate = subMonths(today, months);

  const finances = await getFinanceDocByFlexibleOrFixedPeriods(TEAM_ID, startDate, today);
  if (!finances) {
    return {
      status: HttpStatusEnum.NOT_FOUND,
      title: 'Finança não Encontrada',
      message: 'Nenhuma finança ativa encontrada para o período atual!',
      data: null
    };
  }

  const aggregatedFinance = aggregateFinances(finances);
  const formattedData = formatFinance(aggregatedFinance);

  return {
    status: HttpStatusEnum.OK,
    title: 'Finança Encontrada',
    message: 'Finança recuperada com sucesso!',
    data: formattedData
  };
}

// export const getFinanceByFixedPeriods = async (months: number) => {

// }

export const processFinanceAccordingToTypeRequested = async (payment: number, paymentDate: Date, type: FinanceTypeEnum) => {
  // const authVerification = await getAuthenticatedUser()
  // if (!authVerification.decodedToken) return globalResponses.unauthorizedUser(authVerification.code)

  const periodFinance = 
    await createOrUpdateFinancialPeriodCorrespondingPaymentDate(payment, paymentDate, type);

  const result: ResponseProps<string> = {
    status: HttpStatusEnum.CREATED,
    title: 'Atualizado',
    message: `Finança atualizada com sucesso!`,
    data: periodFinance
  }

  return result
}

export const createOrUpdateFinancialPeriodCorrespondingPaymentDate = async (payment: number, paymentDate: Date, financeType: FinanceTypeEnum) => {
  const today = new Date();
  const date = new Date(paymentDate);
  const periodId = getCurrentPeriod(date);

  const financeDoc = await getFinanceDocByPeriod(TEAM_ID, periodId);
  const financeValues = getFinancialValuesByTypeFactory.get(financeType)!;
  const updatedValues  = financeValues(payment, paymentDate, financeDoc)

  if (financeDoc) {
    const updatedFinanceDoc: FinanceDocData = {
      ...financeDoc,
      ...updatedValues,
      updatedAt: today,
    };

    return await updateFinanceDoc(TEAM_ID, periodId, updatedFinanceDoc);
  }

  const newFinanceData: FinanceDocData = {
    ...baseFinanceData(today),
    ...updatedValues,
  };

  return await createFinanceDoc(TEAM_ID, periodId, newFinanceData);
}

const aggregateFinances = (finances: FinanceFirestore[]) => {
  const initialData: FinanceFirestore = {
    ...baseFinanceData(new Date()),
    id: finances[0].id,
    lastCost: null,
    lastSold: null,
    lastProfit: null,
    lastPurchased: null,
    createdAt: finances[0].createdAt,
    updatedAt: finances[0].updatedAt,
  };

  const aggregatedId = `${finances[0].id} - ${finances[finances.length - 1].id}`;
  const aggregated = finances.reduce((acc, current) => {

    const lastCost = (acc.lastCost && current.lastCost && current.lastCost.toMillis() > acc.lastCost.toMillis()) ? current.lastCost : (acc.lastCost || current.lastCost);
    const lastPurchased = (acc.lastPurchased && current.lastPurchased && current.lastPurchased.toMillis() > acc.lastPurchased.toMillis()) ? current.lastPurchased : (acc.lastPurchased || current.lastPurchased);
    const lastProfit = (acc.lastProfit && current.lastProfit && current.lastProfit.toMillis() > acc.lastProfit.toMillis()) ? current.lastProfit : (acc.lastProfit || current.lastProfit);
    const lastSold = (acc.lastSold && current.lastSold && current.lastSold.toMillis() > acc.lastSold.toMillis()) ? current.lastSold : (acc.lastSold || current.lastSold);
    
    return {
      id: aggregatedId,
      amountCost: acc.amountCost + current.amountCost,
      amountPurchased: acc.amountPurchased + current.amountPurchased,
      amountProfit: acc.amountProfit + current.amountProfit,
      amountSold: acc.amountSold + current.amountSold,
      countCost: acc.countCost + current.countCost,
      countPurchased: acc.countPurchased + current.countPurchased,
      countProfit: acc.countProfit + current.countProfit,
      countSold: acc.countSold + current.countSold,
      lastCost,
      lastPurchased,
      lastProfit,
      lastSold,
      createdAt: finances[finances.length - 1].createdAt,
      updatedAt: finances[0].updatedAt,
    }
  }, initialData);

  return aggregated;
}

const baseFinanceData = (now: Date): FinanceDocData => ({
  countCost: 0,
  countProfit: 0,
  countPurchased: 0,
  countSold: 0,
  amountCost: 0,
  amountProfit: 0,
  amountPurchased: 0,
  amountSold: 0,
  lastCost: null,
  lastSold: null,
  lastProfit: null,
  lastPurchased: null,
  createdAt: now,
  updatedAt: now
})