import z from "zod";
import { vehicleSell } from "../validations/Sale";
import { Timestamp } from "firebase-admin/firestore";
import { SaleClassificationEnum, SalePaymentMethodEnum } from "../enums/Payment";
import { currencyFormatter, dateFormatter } from "../utils/formatter";
import { translateEnum } from "../utils/enum-helpers";

export interface SellVehicleRequestBody {
  plate: string,
  purchase: number,
  sellerId: string,
  saleDate: Date,
  salePrice: number,
  buyerId?: string,
  paymentMethod: number,
  cost: number,
  notes?: string
  previousStatusDocumentId: string,
}

export interface VehicleSaleDocData extends Omit<VehicleSaleFirestore, 'id' | 'saleDate' | 'createdAt' | 'updatedAt'> {
  saleDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface VehicleSaleFirestore {
  id: string;
  sellerId: string;
  buyerId?: string | null;
  purchasePrice: number;
  totalCost: number; 
  salePrice: number;
  saleDate: Timestamp;
  paymentMethod: SalePaymentMethodEnum;
  notes?: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface VehicleSoldFormatted extends Omit<VehicleSaleFirestore, 'buyerId' | 'saleDate' | 'notes' | 'createdAt' | 'updatedAt'> {
  buyerId: string | null;
  saleDate: Date;
  notes: string | null;
  realTotalCost: number;
  grossProfit: number;
  grossMarginPercentage: number;
  roiPercentage: number;
  classification: SaleClassificationEnum;
  createdAt: Date;
  updatedAt: Date;
  purchasePriceFormatted: string;
  totalCostFormatted: string;
  salePriceFormatted: string;
  saleDateFormatted: string;
  paymentMethodFormatted: string;
  classificationFormatted: string;
  grossProfitFormatted: string;
  grossMarginPercentageFormatted: string;
  realTotalCostFormatted: string;
  roiPercentageFormatted: string;
  descriptionClassification: string;
  createdAtFormatted: string;
  updatedAtFormatted: string;
}

export interface VehicleSalesPerformanceAnalysis {
  realTotalCost: number;
  grossProfit: number;
  grossMarginPercentage: number;
  roiPercentage: number;
  grossMarginPercentageFormatted: string;
  roiPercentageFormatted: string;
  classification: SaleClassificationEnum;
  descriptionClassification: string;
}

export type VehicleSellFormInputs = z.infer<typeof vehicleSell>;

export function formatVehicleSold(item: VehicleSaleFirestore, analysis: VehicleSalesPerformanceAnalysis): VehicleSoldFormatted {
  return {
    id: item.id,
    sellerId: item.sellerId,
    buyerId: item.buyerId ?? null,
    purchasePrice: item.purchasePrice,
    totalCost: item.totalCost,
    realTotalCost: analysis.realTotalCost,
    salePrice: item.salePrice,
    saleDate: item.saleDate.toDate(),
    paymentMethod: item.paymentMethod,
    notes: item.notes ?? null,
    classification: analysis.classification,
    grossProfit: analysis.grossProfit,
    grossMarginPercentage: analysis.grossMarginPercentage,
    roiPercentage: analysis.roiPercentage,
    createdAt: item.createdAt.toDate(),
    updatedAt: item.updatedAt.toDate(),
    purchasePriceFormatted: currencyFormatter.format(item.purchasePrice),
    totalCostFormatted: currencyFormatter.format(item.totalCost),
    realTotalCostFormatted: currencyFormatter.format(analysis.realTotalCost),
    salePriceFormatted: currencyFormatter.format(item.salePrice),
    saleDateFormatted: dateFormatter.format(item.saleDate.toDate()),
    roiPercentageFormatted: analysis.roiPercentageFormatted,
    grossProfitFormatted: currencyFormatter.format(analysis.grossProfit),
    paymentMethodFormatted: translateEnum('PaymentMethodForSale', item.paymentMethod),
    classificationFormatted: translateEnum('SaleClassification', analysis.classification),
    grossMarginPercentageFormatted: analysis.grossMarginPercentageFormatted,
    descriptionClassification: analysis.descriptionClassification,
    createdAtFormatted: dateFormatter.format(item.createdAt.toDate()),
    updatedAtFormatted: dateFormatter.format(item.updatedAt.toDate()),
  }
}