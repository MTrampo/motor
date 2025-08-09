import z from 'zod'
import { DocumentReference, Timestamp, DocumentData } from 'firebase-admin/firestore';
import { CustomerFistore, CustomerFormatted } from "./Customer"
import { budgetFormSchema } from '../validations/Budget'
import { currencyFormatter, dateFormatter } from '../utils/formatter'
import { ServiceFistore, ServiceFormatted } from './Service'
import { CarConditionTypeEnum, CarStatusEnum } from '../enums/Car';
import { AuctionTypeEnum, DamageTypeEnum } from '../enums/Auction';
import { translateEnum } from '../utils/enum-helpers';

export interface BudgetRequestBody {
  documentId: string
  items: BudgetItemRequestBody[]
}

export interface BudgetItemRequestBody {
  description: string
  price: number
  amount: number
}

export interface BudgetDocData {
  total: number
  items: AuctionFirestore[]
  customerRef?: DocumentReference
  servicePerformed: boolean
  createdAt: Date
  updatedAt: Date
}

interface AuctionFirestore {
  code: string,
  name: string,
  consignor: string,
  damageType: DamageTypeEnum,
  functional: AuctionTypeEnum,
}

export interface VehicleFistore {
  id: string,
  brand: string,
  model: string,
  color: string,
  version: string,
  licensePlate: string,
  modelYear: string,
  manufacturingYear: string,
  conditionType: CarConditionTypeEnum,
  status: CarStatusEnum,
  fipe: number,
  paid?: number,
  paymentDate?: Timestamp,
  auction?: AuctionFirestore,
  createdAt: Timestamp,
  updatedAt: Timestamp,
}

export interface AuctionFormatted {
  code: string,
  name: string,
  consignor: string,
  damageType: DamageTypeEnum,
  functional: AuctionTypeEnum,
  damageTypeFormatted: string,
  functionalFormatted: string,
}

export interface VehicleFormatted {
  id: string,
  brand: string,
  model: string,
  color: string,
  version: string,
  licensePlate: string,
  modelYear: string,
  manufacturingYear: string,
  conditionType: CarConditionTypeEnum,
  status: CarStatusEnum,
  fipe: number,
  paid?: number,
  paymentDate?: Date | null,
  auction: AuctionFormatted | null,
  createdAt: Date,
  updatedAt: Date,
  conditionTypeFormatted: string,
  statusFormatted: string,
  fipeFormatted?: string,
  paidFormatted?: string,
  paymentDateFormatted: string,
  updatedAtFormatted: string,
  createdAtFormatted: string,
}

export interface ReturnPageBudgets {
  formattedData: VehicleFormatted[]
  lastDocument: string | null
}

export type BudgetFormInputs = z.infer<typeof budgetFormSchema>

export function formatVehicle(vehicle: VehicleFistore): VehicleFormatted {
  return {
    id: vehicle.id,
    brand: vehicle.brand.toUpperCase(),
    model: vehicle.model.toUpperCase(),
    color: vehicle.color.toUpperCase(),
    version: vehicle.version.toUpperCase(),
    licensePlate: vehicle.licensePlate.toUpperCase(),
    modelYear: vehicle.modelYear,
    manufacturingYear: vehicle.manufacturingYear,
    conditionType: vehicle.conditionType,
    status: vehicle.status,
    fipe: vehicle.fipe,
    paid: vehicle.paid,
    paymentDate: vehicle.paymentDate ? vehicle.paymentDate.toDate() : null,
    auction: vehicle.auction ? {
      code: vehicle.auction.code,
      name: vehicle.auction.name,
      consignor: vehicle.auction.consignor,
      damageType: vehicle.auction.damageType,
      functional: vehicle.auction.functional,
      damageTypeFormatted: translateEnum('DamageType', vehicle.auction.damageType),
      functionalFormatted: translateEnum('AuctionType', vehicle.auction.functional),
    } : null,
    createdAt: vehicle.createdAt.toDate(),
    updatedAt: vehicle.updatedAt.toDate(),
    conditionTypeFormatted: translateEnum('CarConditionType', vehicle.conditionType),
    statusFormatted: translateEnum('CarStatus', vehicle.status),
    fipeFormatted: currencyFormatter.format(vehicle.fipe),
    paidFormatted: currencyFormatter.format(vehicle.paid ?? 0),
    paymentDateFormatted: vehicle.paymentDate ? dateFormatter.format(vehicle.paymentDate.toDate()) : 'N/A',
    createdAtFormatted: dateFormatter.format(vehicle.createdAt.toDate()),
    updatedAtFormatted: dateFormatter.format(vehicle.updatedAt.toDate()),
  }  
}

export function formatVehicles(vehicles: VehicleFistore[]): VehicleFormatted[] {
  return vehicles.map(vehicle => ({
    id: vehicle.id,
    brand: vehicle.brand.toUpperCase(),
    model: vehicle.model.toUpperCase(),
    color: vehicle.color.toUpperCase(),
    version: vehicle.version.toUpperCase(),
    licensePlate: vehicle.licensePlate.toUpperCase(),
    modelYear: vehicle.modelYear,
    manufacturingYear: vehicle.manufacturingYear,
    conditionType: vehicle.conditionType,
    status: vehicle.status,
    fipe: vehicle.fipe,
    paid: vehicle.paid,
    paymentDate: vehicle.paymentDate ? vehicle.paymentDate.toDate() : null,
    auction: vehicle.auction ? {
      code: vehicle.auction.code,
      name: vehicle.auction.name,
      consignor: vehicle.auction.consignor,
      damageType: vehicle.auction.damageType,
      functional: vehicle.auction.functional,
      damageTypeFormatted: translateEnum('DamageType', vehicle.auction.damageType),
      functionalFormatted: translateEnum('AuctionType', vehicle.auction.functional),
    } : null,
    createdAt: vehicle.createdAt.toDate(),
    updatedAt: vehicle.updatedAt.toDate(),
    conditionTypeFormatted: translateEnum('CarConditionType', vehicle.conditionType),
    statusFormatted: translateEnum('CarStatus', vehicle.status),
    fipeFormatted: currencyFormatter.format(vehicle.fipe),
    paidFormatted: currencyFormatter.format(vehicle.paid ?? 0),
    paymentDateFormatted: vehicle.paymentDate ? dateFormatter.format(vehicle.paymentDate.toDate()) : 'N/A',
    createdAtFormatted: dateFormatter.format(vehicle.createdAt.toDate()),
    updatedAtFormatted: dateFormatter.format(vehicle.updatedAt.toDate()),
  }))
}