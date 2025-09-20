import { Timestamp } from "firebase/firestore"
import { dateFormatter, currencyFormatter, formatLastUpdated, formatFinanceDifference } from "../utils/formatter"
import { FinanceTypeEnum, StatusComparisonEnum } from "../enums/Finance";

export interface SynchronizeFinanceAndVehicleData {
  plate: string,
  cost?: number,
  countItems?: number,
  payment: number,
  paymentDate: Date,
  type: FinanceTypeEnum
}

export interface FinanceDocData extends Omit<FinanceFirestore, 
  'id' | 'createdAt' | 'updatedAt' | 'lastProfit' | 'lastPurchased' | 'lastSold' | 'lastCost'
> {
  lastPurchased: Date | Timestamp | null;
  lastCost: Date | Timestamp | null;
  lastSold: Date | Timestamp | null;
  lastProfit: Date | Timestamp | null;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface FinanceFirestore {
  id: string,
  lastPurchased: Timestamp | null,
  lastCost: Timestamp | null,
  lastSold: Timestamp | null,
  lastProfit: Timestamp | null,
  amountCost: number,
  countCost: number,
  amountProfit: number,
  countProfit: number,
  amountPurchased: number,
  countPurchased: number,
  countSold: number,
  amountSold: number,
  createdAt: Timestamp,
  updatedAt: Timestamp,
}

export interface FinanceFormatted {
  id: string
  lastPurchased: Date | null
  lastCost: Date | null
  lastSold: Date | null
  lastProfit: Date | null
  amountCost: number
  amountPurchased: number
  amountProfit: number
  amountSold: number
  countCost: number
  countProfit: number
  countPurchased: number
  countSold: number
  createdAt: Date
  updatedAt: Date
  amountCostFormatted: string
  amountPurchasedFormatted: string
  amountProfitFormatted: string
  amountSoldFormatted: string
  lastPurchasedFormatted: string
  lastCostFormatted: string
  lastSoldFormatted: string
  lastProfitFormatted: string
  updatedAtFormatted: string,
  createdAtFormatted: string,
}

export interface FinanceComparison {
  percentage: number;
  status: StatusComparisonEnum;
  text: string;
  difference: number;
}

export interface FinanceComparisonFormatted extends FinanceFormatted {
  comparison: {
    amountPurchased: FinanceComparison;
    amountSold: FinanceComparison;
    amountProfit: FinanceComparison;
    amountCost: FinanceComparison;
    countPurchased: FinanceComparison;
    countSold: FinanceComparison;
    countProfit: FinanceComparison;
    countCost: FinanceComparison;
  };
}

export function formatFinance(finance: FinanceFirestore): FinanceFormatted {
  return {
    id: finance.id,
    lastPurchased: finance.lastPurchased ? finance.lastPurchased.toDate() : null,
    lastCost: finance.lastCost ? finance.lastCost.toDate() : null,
    lastSold: finance.lastSold ? finance.lastSold.toDate() : null,
    lastProfit: finance.lastProfit ? finance.lastProfit.toDate() : null,
    amountCost: finance.amountCost,
    amountPurchased: finance.amountPurchased,
    amountProfit: finance.amountProfit,
    amountSold: finance.amountSold,
    countCost: finance.countCost,
    countProfit: finance.countProfit,
    countPurchased: finance.countPurchased,
    countSold: finance.countSold,
    createdAt: finance.createdAt.toDate(),
    updatedAt: finance.updatedAt.toDate(),
    amountCostFormatted: currencyFormatter.format(finance.amountCost),
    amountPurchasedFormatted: currencyFormatter.format(finance.amountPurchased),
    amountProfitFormatted: currencyFormatter.format(finance.amountProfit),
    amountSoldFormatted: currencyFormatter.format(finance.amountSold),
    lastPurchasedFormatted: formatLastUpdated(finance.lastPurchased ? finance.lastPurchased.toDate() : null),
    lastCostFormatted: formatLastUpdated(finance.lastCost ? finance.lastCost.toDate() : null),
    lastSoldFormatted: formatLastUpdated(finance.lastSold ? finance.lastSold.toDate() : null),
    lastProfitFormatted: formatLastUpdated(finance.lastProfit ? finance.lastProfit.toDate() : null),
    updatedAtFormatted: dateFormatter.format(finance.createdAt.toDate()),
    createdAtFormatted: dateFormatter.format(finance.updatedAt.toDate()),
  }
}

export function formatFinanceWithComparison(
  currentFinance: FinanceFirestore,
  previousFinance: FinanceFirestore | null
) : FinanceComparisonFormatted {
  const formattedBase = formatFinance(currentFinance);
  const comparison = {
    amountPurchased: createComparisonData(formattedBase.amountPurchased, previousFinance?.amountPurchased || 0, true),
    amountSold: createComparisonData(formattedBase.amountSold, previousFinance?.amountSold || 0, true),
    amountProfit: createComparisonData(formattedBase.amountProfit, previousFinance?.amountProfit || 0, true),
    amountCost: createComparisonData(formattedBase.amountCost, previousFinance?.amountCost || 0, true),
    countPurchased: createComparisonData(formattedBase.countPurchased, previousFinance?.countPurchased || 0, false),
    countSold: createComparisonData(formattedBase.countSold, previousFinance?.countSold || 0, false),
    countProfit: createComparisonData(formattedBase.countProfit, previousFinance?.countProfit || 0, false),
    countCost: createComparisonData(formattedBase.countCost, previousFinance?.countCost || 0, false),
  };

  return {
    ...formattedBase,
    comparison: comparison,
  };
}

export function formatFinances(finances: FinanceFirestore[]): FinanceFormatted[] {
  return finances.map(finance => ({
    id: finance.id,
    lastPurchased: finance.lastPurchased ? finance.lastPurchased.toDate() : null,
    lastCost: finance.lastCost ? finance.lastCost.toDate() : null,
    lastSold: finance.lastSold ? finance.lastSold.toDate() : null,
    lastProfit: finance.lastProfit ? finance.lastProfit.toDate() : null,
    amountCost: finance.amountCost,
    amountPurchased: finance.amountPurchased,
    amountProfit: finance.amountProfit,
    amountSold: finance.amountSold,
    countCost: finance.countCost,
    countProfit: finance.countProfit,
    countPurchased: finance.countPurchased,
    countSold: finance.countSold,
    createdAt: finance.createdAt.toDate(),
    updatedAt: finance.updatedAt.toDate(),
    amountCostFormatted: currencyFormatter.format(finance.amountCost),
    amountPurchasedFormatted: currencyFormatter.format(finance.amountPurchased),
    amountProfitFormatted: currencyFormatter.format(finance.amountProfit),
    amountSoldFormatted: currencyFormatter.format(finance.amountSold),
    lastPurchasedFormatted: formatLastUpdated(finance.lastPurchased ? finance.lastPurchased.toDate() : null),
    lastCostFormatted: formatLastUpdated(finance.lastCost ? finance.lastCost.toDate() : null),
    lastSoldFormatted: formatLastUpdated(finance.lastSold ? finance.lastSold.toDate() : null),
    lastProfitFormatted: formatLastUpdated(finance.lastProfit ? finance.lastProfit.toDate() : null),
    updatedAtFormatted: dateFormatter.format(finance.createdAt.toDate()),
    createdAtFormatted: dateFormatter.format(finance.updatedAt.toDate()),
  }))
}

const createComparisonData = (currentValue: number, comparisonValue: number, isCurrency: boolean) => {
  const difference = currentValue - comparisonValue;
  let percentage = 0;
  let status = StatusComparisonEnum.STABLE;

  if (comparisonValue !== 0) {
    percentage = (difference / comparisonValue) * 100;
  } else {
    if (currentValue > 0) {
      percentage = 100;
    } else if (currentValue < 0) {
      percentage = -100;
    }
  }

  if (percentage > 0) {
    status = StatusComparisonEnum.HIGH;
  } else if (percentage < 0) {
    status = StatusComparisonEnum.LOW;
  }

  return {
    percentage: parseFloat(percentage.toFixed(2)),
    status,
    text: formatFinanceDifference(status, isCurrency, difference),
    difference: difference,
  };
}