import z from 'zod'
import { Timestamp } from 'firebase-admin/firestore';
import { currencyFormatter, dateFormatter, formatNumber } from '../utils/formatter'
import { CarConditionTypeEnum, CarOrigenEnum, CarStatusEnum } from '../enums/Car';
import { AuctionTypeEnum, DamageTypeEnum } from '../enums/Auction';
import { translateEnum } from '../utils/enum-helpers';
import { MaintenanceVehicleFistore, MaintenanceVehicleFormatted } from './Maintenance';
import { auctionFormSchema, paymentFormSchema, thirdFormSchema, vehicleFormSchema, vehicleMainFormSchema } from '../validations/Vehicle';

// export interface BudgetRequestBody {
//   documentId: string
//   items: BudgetItemRequestBody[]
// }

// export interface BudgetItemRequestBody {
//   description: string
//   price: number
//   amount: number
// }

// export interface BudgetDocData {
//   total: number
//   items: AuctionFirestore[]
//   customerRef?: DocumentReference
//   servicePerformed: boolean
//   createdAt: Date
//   updatedAt: Date
// }

interface AuctionFirestore {
  code: string,
  name: string,
  consignor: string,
  damageType: DamageTypeEnum,
  functional: AuctionTypeEnum,
  bid: number,
  commission: number,
  administrative: number,
  others: number,
}

export interface VehicleFistore {
  id: string,
  brand: string,
  model: string,
  color: string,
  version: string,
  images: string[],
  licensePlate: string,
  kilometers: number,
  chassis: string,
  modelYear: string,
  manufacturingYear: string,
  conditionType: CarConditionTypeEnum,
  status: CarStatusEnum,
  fipe: number,
  paid?: number,
  paymentDate?: Timestamp,
  auction?: AuctionFirestore,
  maintenance?: MaintenanceVehicleFistore,
  createdAt: Timestamp,
  updatedAt: Timestamp,
}

export interface AuctionFormatted {
  code: string,
  name: string,
  consignor: string,
  damageType: DamageTypeEnum,
  functional: AuctionTypeEnum,
  bid: number,
  commission: number,
  administrative: number,
  others: number,
  bidFormatted: string,
  commissionFormatted: string,
  administrativeFormatted: string,
  othersFormatted: string,
  damageTypeFormatted: string,
  functionalFormatted: string,
}

export interface VehicleFormatted {
  id: string,
  brand: string,
  model: string,
  color: string,
  version: string,
  images: string[],
  licensePlate: string,
  kilometers: string,
  chassis: string,
  modelYear: string,
  manufacturingYear: string,
  conditionType: CarConditionTypeEnum,
  status: CarStatusEnum,
  fipe: number,
  paid?: number,
  paymentDate?: Date | null,
  auction: AuctionFormatted | null,
  maintenance: MaintenanceVehicleFormatted,
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

// export interface ReturnPageBudgets {
//   formattedData: VehicleFormatted[]
//   lastDocument: string | null
// }

export type VehicleFormInputs = z.infer<typeof vehicleFormSchema>
export type AuctionFormInputs = z.infer<typeof auctionFormSchema>
export type ThirdFormInputs = z.infer<typeof thirdFormSchema>
export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;
export type VehicleMainFormInputs = z.infer<typeof vehicleMainFormSchema>;

export function formatVehicle(vehicle: VehicleFistore): VehicleFormatted {
  return {
    id: vehicle.id,
    brand: vehicle.brand.toUpperCase(),
    model: vehicle.model.toUpperCase(),
    color: vehicle.color.toUpperCase(),
    version: vehicle.version.toUpperCase(),
    images: vehicle.images,
    licensePlate: vehicle.licensePlate.toUpperCase(),
    kilometers: `${formatNumber.format(vehicle.kilometers)} Km`,
    chassis: vehicle.chassis.toUpperCase(),
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
      bid: vehicle.auction.bid,
      commission: vehicle.auction.commission,
      administrative: vehicle.auction.administrative,
      others: vehicle.auction.others,
      bidFormatted: currencyFormatter.format(vehicle.auction.bid),
      commissionFormatted: currencyFormatter.format(vehicle.auction.commission),
      administrativeFormatted: currencyFormatter.format(vehicle.auction.administrative),
      othersFormatted: currencyFormatter.format(vehicle.auction.others),
      damageTypeFormatted: translateEnum('DamageType', vehicle.auction.damageType),
      functionalFormatted: translateEnum('AuctionType', vehicle.auction.functional),
    } : null,
    maintenance: {
      total: vehicle.maintenance?.total || 0,
      totalFormatted: currencyFormatter.format(vehicle.maintenance?.total || 0),
    },
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
    images: vehicle.images,
    licensePlate: vehicle.licensePlate.toUpperCase(),
    kilometers: `${formatNumber.format(vehicle.kilometers)} Km`,
    chassis: vehicle.chassis.toUpperCase(),
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
      bid: vehicle.auction.bid,
      commission: vehicle.auction.commission,
      administrative: vehicle.auction.administrative,
      others: vehicle.auction.others,
      bidFormatted: currencyFormatter.format(vehicle.auction.bid),
      commissionFormatted: currencyFormatter.format(vehicle.auction.commission),
      administrativeFormatted: currencyFormatter.format(vehicle.auction.administrative),
      othersFormatted: currencyFormatter.format(vehicle.auction.others),
      damageTypeFormatted: translateEnum('DamageType', vehicle.auction.damageType),
      functionalFormatted: translateEnum('AuctionType', vehicle.auction.functional),
    } : null,
    maintenance: {
      total: vehicle.maintenance?.total || 0,
      totalFormatted: currencyFormatter.format(vehicle.maintenance?.total || 0),
    },
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