import { DocumentReference, Timestamp } from "firebase-admin/firestore"
import { VehicleFistore, VehicleFormatted, formatVehicle } from "./Vehicle"
import { currencyFormatter, dateFormatter, dateTimeFormatter } from "../utils/formatter"
import { z } from "zod"
import { CostTypeEnum } from "../enums/Cost"
import { translateEnum } from "../utils/enum-helpers"
import { registerCostFormSchema } from "../validations/Cost"
import { PaginatedResult } from "./Data"

export interface CostRequestBody {
  documentId: string
  guidItem?: string
  items?: CostItemRequestBody[]
}

export interface CostItemRequestBody {
  guid?: string;
  value: number;
  description: string;
  type: number;
  paymentDate: Date;
}

export interface CostDocData {
  total: number
  items: CostItemDocData[]
  createdAt: Date
  updatedAt: Date
}

export interface CostItemDocData {
  guid: string;
  value: number;
  description: string;
  type: number;
  paymentDate: Date;
}

export interface ItemsCostFistore {
  guid: string;
  value: number;
  description: string;
  type: CostTypeEnum;
  paymentDate: Timestamp;
}

export interface CostFistore {
  id: string;
  total: number;
  items: ItemsCostFistore[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ItemsCostFormatted {
  guid: string;
  value: number;
  description: string;
  type: CostTypeEnum;
  paymentDate: Date;
  valueFormatted: string;
  typeFormatted: string;
  paymentDateFormatted: string;
}

export interface CostFormatted {
  id: string;
  total: number;
  items: ItemsCostFormatted[];
  createdAt: Date;
  updatedAt: Date;
  totalFormatted: string;
  updatedAtFormatted: string;
  createdAtFormatted: string;
}

export type RegisterCostFormInputs = z.infer<typeof registerCostFormSchema>;

export function formatCost(cost: CostFistore): CostFormatted {
  return {
    id: cost.id,
    total: cost.total,
    items: cost.items
      .sort((a, b) => b.paymentDate.toDate().getTime() - a.paymentDate.toDate().getTime())
      .map((item) => ({
        guid: item.guid,
        value: item.value,
        description: item.description,
        type: item.type,
        paymentDate: item.paymentDate.toDate(),
        valueFormatted: currencyFormatter.format(item.value),
        typeFormatted: translateEnum('CostType', item.type),
        paymentDateFormatted: dateFormatter.format(item.paymentDate.toDate()),
      })),
    createdAt: cost.createdAt.toDate(),
    updatedAt: cost.updatedAt.toDate(),
    totalFormatted: currencyFormatter.format(cost.total),
    createdAtFormatted: dateFormatter.format(cost.createdAt.toDate()),
    updatedAtFormatted: dateFormatter.format(cost.updatedAt.toDate()),
  }
}