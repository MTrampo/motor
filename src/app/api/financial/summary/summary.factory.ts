import { FinanceTypeEnum } from "@/commons/enums/Finance";
import { FinanceDocData, FinanceFirestore } from "@/commons/models/Finance";

interface FinancialValueFunction {
  (payment: number, paymentDate: Date, financeDoc: FinanceFirestore | null): Partial<FinanceDocData>;
}

export const getFinancialValuesByTypeFactory = new Map<FinanceTypeEnum, FinancialValueFunction>([
  [FinanceTypeEnum.COST, (payment, paymentDate, financeDoc) => ({
    countCost: (financeDoc?.countCost || 0) + 1,
    amountCost: (financeDoc?.amountCost || 0) + payment,
    lastCost: paymentDate,
  })],
  [FinanceTypeEnum.PROFIT, (payment, paymentDate, financeDoc) => ({
    countProfit: (financeDoc?.countProfit || 0) + 1,
    amountProfit: (financeDoc?.amountProfit || 0) + payment,
    lastProfit: paymentDate,
  })],
  [FinanceTypeEnum.PURCHASED, (payment, paymentDate, financeDoc) => ({
    countPurchased: (financeDoc?.countPurchased || 0) + 1,
    amountPurchased: (financeDoc?.amountPurchased || 0) + payment,
    lastPurchased: paymentDate,
  })],
  [FinanceTypeEnum.SOLD, (payment, paymentDate, financeDoc) => ({
    countSold: (financeDoc?.countSold || 0) + 1,
    amountSold: (financeDoc?.amountSold || 0) + payment,
    lastSold: paymentDate,
  })],
]);