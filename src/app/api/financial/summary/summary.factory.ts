import { FinanceTypeEnum } from "@/commons/enums/Finance";
import { FinanceDocData, FinanceFirestore } from "@/commons/models/Finance";

interface FinancialValueFunction {
  (
    payment: number, 
    paymentDate: Date, 
    financeDoc: FinanceFirestore | null,
    count?: number,
    factor?: number
  ): Partial<FinanceDocData>;
}

export const getFinancialValuesByTypeFactory = new Map<FinanceTypeEnum, FinancialValueFunction>([
  [FinanceTypeEnum.COST, (payment, paymentDate, financeDoc, count = 1, factor = 1) => ({
    countCost: Math.max(0, (financeDoc?.countCost || 0) + (count * factor)),
    amountCost: (financeDoc?.amountCost || 0) + (payment * factor),
    lastCost: paymentDate,
  })],
  [FinanceTypeEnum.PROFIT, (payment, paymentDate, financeDoc, count = 1, factor = 1) => ({
    countProfit: Math.max(0, (financeDoc?.countProfit || 0) + (count * factor)),
    amountProfit: (financeDoc?.amountProfit || 0) + (payment * factor),
    lastProfit: paymentDate,
  })],
  [FinanceTypeEnum.PURCHASED, (payment, paymentDate, financeDoc, count = 1, factor = 1) => ({
    countPurchased: Math.max(0, (financeDoc?.countPurchased || 0) + (count * factor)),
    amountPurchased: (financeDoc?.amountPurchased || 0) + (payment * factor),
    lastPurchased: paymentDate,
  })],
  [FinanceTypeEnum.SOLD, (payment, paymentDate, financeDoc, count = 1, factor = 1) => ({
    countSold: Math.max(0, (financeDoc?.countSold || 0) + (count * factor)),
    amountSold: (financeDoc?.amountSold || 0) + (payment * factor),
    lastSold: paymentDate,
  })],
]);