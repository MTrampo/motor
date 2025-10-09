import { ResponseProps } from "@/commons/models/Api";
import { FinanceDocData, FinanceFirestore, formatFinance, formatFinanceWithComparison, SynchronizeFinanceAndVehicleData } from "@/commons/models/Finance";
import { getCurrentPeriod } from "@/commons/utils/generate-data";
import { createFinanceDoc, getFinanceDocByPeriod, getFinanceDocByFlexibleOrFixedPeriods, updateFinanceDoc } from "./summary.firestore";
import { HttpStatusEnum } from "@/commons/enums/Api";
import { FinanceTypeEnum } from "@/commons/enums/Finance";
import { getFinancialValuesByTypeFactory } from "./summary.factory";
import { endOfQuarter, startOfQuarter, subMonths, subQuarters } from "date-fns";
import { updateVehicleCost } from "../vehicle/vehicle.api";
import { Timestamp } from "firebase-admin/firestore";


export const getFinanceById = async (teamId: string) => {
  const periodId = getCurrentPeriod();
  const finance = await getFinanceDocByPeriod(teamId, periodId);

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

export const getQuarterlyFinanceComparison = async (teamId: string) => {
  const today = new Date();

  // Define o período atual (trimestre)
  const currentQuarterStart = startOfQuarter(today);
  const currentQuarterEnd = endOfQuarter(today);

  // Busca os dados do trimestre atual
  const currentData = await getFinanceDocByFlexibleOrFixedPeriods(teamId, currentQuarterStart, currentQuarterEnd);
  //if (!currentData) throw new NotFound(ErrorCode.SUMMARY_NOT_FOUND);

  // Define o período anterior (trimestre)
  const previousQuarterStart = startOfQuarter(subQuarters(today, 1));
  const previousQuarterEnd = endOfQuarter(subQuarters(today, 1));

  // Busca os dados do trimestre anterior
  const previousData = await getFinanceDocByFlexibleOrFixedPeriods(teamId, previousQuarterStart, previousQuarterEnd);


  // Agrega os dados do trimestre atual e anterior
  const currentSummary = currentData ? aggregateFinances(currentData) : null;
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

export const getFinanceByFlexiblePeriods = async (teamId: string, months: number) => {
  const today = new Date();
  const startDate = subMonths(today, months);

  const finances = await getFinanceDocByFlexibleOrFixedPeriods(teamId, startDate, today);
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

export const addFinanceAccordingToTypeRequested = (
  teamId: string,
  payment: number,
  paymentDate: Date,
  type: FinanceTypeEnum
) => processFinanceAccordingToTypeRequested(teamId, payment, paymentDate, type, false);

export const removeFinanceAccordingToTypeRequested = (
  teamId: string,
  payment: number,
  paymentDate: Date,
  type: FinanceTypeEnum
) => processFinanceAccordingToTypeRequested(teamId, payment, paymentDate, type, true);

export const addAndSynchronizeVehicleFinances = async (teamId: string, item: SynchronizeFinanceAndVehicleData) => {
  await processFinanceAccordingToTypeRequested(teamId, item.payment, item.paymentDate, item.type, false, item.countItems);

  const newValue = item.cost || item.payment
  await updateVehicleCost(teamId, item.plate, newValue)
}

export const removeAndSynchronizeVehicleFinances = async (teamId: string, item: SynchronizeFinanceAndVehicleData) => {
  await processFinanceAccordingToTypeRequested(teamId, item.payment, item.paymentDate, item.type, true);

  const newValue = item.cost ?? item.payment
  await updateVehicleCost(teamId, item.plate, newValue)
}

async function processFinanceAccordingToTypeRequested (
  teamId: string, payment: number, paymentDate: Date,
  type: FinanceTypeEnum, isDecrement: boolean = false, count: number = 1
) {
  const factor = isDecrement ? -1 : 1;

  const periodFinance = 
    await createOrUpdateFinancialPeriodCorrespondingPaymentDate(teamId, payment, paymentDate, type, count, factor);

  const result: ResponseProps<string> = {
    title: 'Atualizado',
    message: `Finança atualizada com sucesso!`,
    data: periodFinance
  }

  return result
}

async function createOrUpdateFinancialPeriodCorrespondingPaymentDate (
  teamId: string, payment: number, paymentDate: Date, 
  financeType: FinanceTypeEnum, count: number = 1, factor: number = 1
) {
  const today = new Date();
  const date = new Date(paymentDate);
  const periodId = getCurrentPeriod(date);

  const financeDoc = await getFinanceDocByPeriod(teamId, periodId);
  const financeValues = getFinancialValuesByTypeFactory.get(financeType)!;
  const updatedValues = financeValues(payment, paymentDate, financeDoc, count, factor)

  if (financeDoc) {
    const updatedFinanceDoc: Omit<FinanceDocData, 'id'> = {
      ...financeDoc,
      ...updatedValues,
      updatedAt: today,
    };

    return await updateFinanceDoc(teamId, periodId, updatedFinanceDoc);
  }

  const newFinanceData: FinanceDocData = {
    ...baseFinanceData(today),
    ...updatedValues,
  };

  return await createFinanceDoc(teamId, periodId, newFinanceData);
}

function aggregateFinances (finances: FinanceFirestore[]) {
  const today = new Date();
  const initialData: FinanceFirestore = {
    ...baseFinanceData(today),
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

function baseFinanceData(now: Date): FinanceDocData {
  return {
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
  };
}