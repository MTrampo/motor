import { Timestamp } from "firebase/firestore"
import { dateFormatter, currencyFormatter, formatLastUpdated } from "../utils/formatter"

// export interface FinanceRequestBody {
//   period: string
//   budgetAmount: number
//   budgetCount: number
//   serviceAmount: number
//   serviceCount: number
// }

// export interface FinanceDocData {
//   period: string
//   lastBudget: Date
//   lastService: Date
//   disabled: boolean
//   budgetedCount: number
//   budgetedAmount: number
//   servicesCount: number
//   servicesAmount: number
//   createdAt: Date
//   updatedAt: Date
// }

export interface FinanceFirestore {
  id: string,
  period: string,
  lastPurchased: Timestamp | null,
  lastMaintenance: Timestamp | null,
  lastSold: Timestamp | null,
  lastProfit: Timestamp | null,
  amountMaintenance: number,
  countMaintenance: number,
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
  period: string
  lastPurchased: Date | null
  lastMaintenance: Date | null
  lastSold: Date | null
  lastProfit: Date | null
  amountMaintenance: number
  amountPurchased: number
  amountProfit: number
  amountSold: number
  countMaintenance: number
  countProfit: number
  countPurchased: number
  countSold: number
  createdAt: Date
  updatedAt: Date
  amountMaintenanceFormatted: string
  amountPurchasedFormatted: string
  amountProfitFormatted: string
  amountSoldFormatted: string
  lastPurchasedFormatted: string
  lastMaintenanceFormatted: string
  lastSoldFormatted: string
  lastProfitFormatted: string
  updatedAtFormatted: string,
  createdAtFormatted: string,
}

export function formatFinance(finance: FinanceFirestore): FinanceFormatted {
  return {
    id: finance.id,
    period: finance.period,
    lastPurchased: finance.lastPurchased ? finance.lastPurchased.toDate() : null,
    lastMaintenance: finance.lastMaintenance ? finance.lastMaintenance.toDate() : null,
    lastSold: finance.lastSold ? finance.lastSold.toDate() : null,
    lastProfit: finance.lastProfit ? finance.lastProfit.toDate() : null,
    amountMaintenance: finance.amountMaintenance,
    amountPurchased: finance.amountPurchased,
    amountProfit: finance.amountProfit,
    amountSold: finance.amountSold,
    countMaintenance: finance.countMaintenance,
    countProfit: finance.countProfit,
    countPurchased: finance.countPurchased,
    countSold: finance.countSold,
    createdAt: finance.createdAt.toDate(),
    updatedAt: finance.updatedAt.toDate(),
    amountMaintenanceFormatted: currencyFormatter.format(finance.amountMaintenance),
    amountPurchasedFormatted: currencyFormatter.format(finance.amountPurchased),
    amountProfitFormatted: currencyFormatter.format(finance.amountProfit),
    amountSoldFormatted: currencyFormatter.format(finance.amountSold),
    lastPurchasedFormatted: formatLastUpdated(finance.lastPurchased ? finance.lastPurchased.toDate() : null),
    lastMaintenanceFormatted: formatLastUpdated(finance.lastMaintenance ? finance.lastMaintenance.toDate() : null),
    lastSoldFormatted: formatLastUpdated(finance.lastSold ? finance.lastSold.toDate() : null),
    lastProfitFormatted: formatLastUpdated(finance.lastProfit ? finance.lastProfit.toDate() : null),
    updatedAtFormatted: dateFormatter.format(finance.createdAt.toDate()),
    createdAtFormatted: dateFormatter.format(finance.updatedAt.toDate()),
  }
}

export function formatFinances(finances: FinanceFirestore[]): FinanceFormatted[] {
  return finances.map(finance => ({
    id: finance.id,
    period: finance.period,
    lastPurchased: finance.lastPurchased ? finance.lastPurchased.toDate() : null,
    lastMaintenance: finance.lastMaintenance ? finance.lastMaintenance.toDate() : null,
    lastSold: finance.lastSold ? finance.lastSold.toDate() : null,
    lastProfit: finance.lastProfit ? finance.lastProfit.toDate() : null,
    amountMaintenance: finance.amountMaintenance,
    amountPurchased: finance.amountPurchased,
    amountProfit: finance.amountProfit,
    amountSold: finance.amountSold,
    countMaintenance: finance.countMaintenance,
    countProfit: finance.countProfit,
    countPurchased: finance.countPurchased,
    countSold: finance.countSold,
    createdAt: finance.createdAt.toDate(),
    updatedAt: finance.updatedAt.toDate(),
    amountMaintenanceFormatted: currencyFormatter.format(finance.amountMaintenance),
    amountPurchasedFormatted: currencyFormatter.format(finance.amountPurchased),
    amountProfitFormatted: currencyFormatter.format(finance.amountProfit),
    amountSoldFormatted: currencyFormatter.format(finance.amountSold),
    lastPurchasedFormatted: formatLastUpdated(finance.lastPurchased ? finance.lastPurchased.toDate() : null),
    lastMaintenanceFormatted: formatLastUpdated(finance.lastMaintenance ? finance.lastMaintenance.toDate() : null),
    lastSoldFormatted: formatLastUpdated(finance.lastSold ? finance.lastSold.toDate() : null),
    lastProfitFormatted: formatLastUpdated(finance.lastProfit ? finance.lastProfit.toDate() : null),
    updatedAtFormatted: dateFormatter.format(finance.createdAt.toDate()),
    createdAtFormatted: dateFormatter.format(finance.updatedAt.toDate()),
  }))
}