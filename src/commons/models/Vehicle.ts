import z from 'zod'
import { Timestamp } from 'firebase-admin/firestore';
import { currencyFormatter, dateFormatter, dateFormatterStatus, formatCpfCnpj, formatNumber, fullNameFormatter } from '../utils/formatter'
import { CarConditionTypeEnum, CarOrigenEnum, CarStatusEnum } from '../enums/Car';
import { AuctionTypeEnum, DamageTypeEnum } from '../enums/Auction';
import { translateEnum } from '../utils/enum-helpers';
import { auctionFormSchema, paymentFormSchema, thirdFormSchema, vehicleFormSchema, vehicleMainFormSchema, vehicleStatus } from '../validations/Vehicle';

export interface VehicleRequestBody {
  documentId: string;
  origin: CarOrigenEnum;
  vehicleThird: VehicleThirdFormInputs | null;
  VehicleAuction: VehicleAuctionFormInputs | null;
}

export interface VehicleStatusHistoryRequestBody extends VehicleStatusFormInputs {
  documentId: string | null;
  plate: string;
}

export interface VehicleSummaryDocData extends Omit<VehicleSummaryFirestore, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleDocData extends Omit<VehicleFistore, 'id' | 'createdAt' | 'updatedAt' | 'payment'> {
  createdAt: Date;
  updatedAt: Date;
  payment: PaymentDocData;
}

interface PaymentDocData extends Omit<PaymentFirestore, 'paymentDate'> {
  paymentDate: Date;
}

export interface VehicleStatusHistoryDocData extends Omit<VehicleStatusHistoryFirestore, 
  'id' | 'createdAt' | 'updatedAt' | 'startedAt' | 'endedAt'> {
  plate: string;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleSummaryFirestore extends Omit<VehicleFistore,
    'images' | 'payment' | 'fipe' | 'chassis' | 'manufacturingYear' | 'modelYear' | 'statusHistory'
> {
  years: string;
  hero: string | null;
  totalPaid: number;
  totalCost: number;
}

export interface VehicleFistore {
  id: string;
  brand: string;
  model: string;
  version: string | null;
  color: string;
  kilometers: number | null;
  chassis: string | null;
  modelYear: string;
  manufacturingYear: string;
  fipe: number | null;
  status: CarStatusEnum;
  conditionType: CarConditionTypeEnum;
  images: VehicleImagesFirestore;
  payment: PaymentFirestore;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface VehicleImagesFirestore {
  purchased?: string[]
  ready?: string[]
}

interface PaymentFirestore {
  total: number;
  paymentDate: Timestamp;
  third?: ThirdFirestore;
  auction?: AuctionFirestore;
  notes?: string
}

interface ThirdFirestore {
  name: string;
  cpfCnpj: string;
}

interface AuctionFirestore {
  code: string;
  name: string;
  consignor: string;
  damageType: DamageTypeEnum;
  functional: AuctionTypeEnum;
  bid: number;
  commission: number;
  administrative: number;
  others: number;
}

export interface VehicleStatusHistoryFirestore {
  id: string
  plate: string
  status: CarStatusEnum;
  startedAt: Timestamp;
  endedAt: Timestamp;
  reason?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface VehicleSummaryFormatted extends Omit<VehicleFormatted,
  'images' | 'payment' | 'fipe' | 'chassis' | 'manufacturingYear' | 'modelYear' | 'statusHistory' |
  'fipeFormatted' | 'status'
> {
  status: CarStatusEnum;
  years: string;
  hero: string | null;
  totalPaid: number;
  totalCost: number;
  totalPaidFormatted: string;
  totalCostFormatted: string;
}

export interface VehicleFormatted {
  id: string;
  brand: string;
  model: string;
  version: string;
  color: string;
  kilometers: string;
  chassis: string;
  modelYear: string;
  manufacturingYear: string;
  fipe: number;
  status: VehicleStatusHistoryFormatted;
  conditionType: CarConditionTypeEnum;
  images: VehicleImagesFormatted;
  payment: PaymentFormatted;
  createdAt: Date;
  updatedAt: Date;
  fipeFormatted: string;
  conditionTypeFormatted: string;
  updatedAtFormatted: string;
  createdAtFormatted: string;
}

interface VehicleImagesFormatted {
  purchased?: string[]
  ready?: string[]
}

interface PaymentFormatted {
  total: number;
  paymentDate: Date;
  third: ThirdFormatted | null;
  auction: AuctionFormatted | null;
  notes?: string
  totalFormatted: string;
  paymentDateFormatted: string
}

interface ThirdFormatted {
  name: string;
  cpfCnpj: string;
}

export interface AuctionFormatted {
  code: string;
  name: string;
  consignor: string;
  damageType: DamageTypeEnum;
  functional: AuctionTypeEnum;
  bid: number;
  commission: number;
  administrative: number;
  others: number;
  damageTypeFormatted: string;
  functionalFormatted: string;
  bidFormatted: string;
  commissionFormatted: string;
  administrativeFormatted: string;
  othersFormatted: string;
}

interface VehicleStatusHistoryFormatted {
  current: CarStatusEnum;
  history: VehicleStatusHistoryItemFormatted[] | null
}

export interface VehicleStatusHistoryItemFormatted extends Omit<VehicleStatusHistoryFirestore,
'startedAt' | 'endedAt' | 'createdAt' | 'updatedAt' | 'plate'> {
  status: CarStatusEnum;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  startedAtAndendedAtFormatted: string;
  createdAtFormatted: string,
  updatedAtFormatted: string,
}

// export interface ReturnPageBudgets {
//   formattedData: VehicleFormatted[]
//   lastDocument: string | null
// }

export type VehicleFormInputs = z.infer<typeof vehicleFormSchema>;
export type AuctionFormInputs = z.infer<typeof auctionFormSchema>;
export type ThirdFormInputs = z.infer<typeof thirdFormSchema>;
export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;
export type VehicleMainFormInputs = z.infer<typeof vehicleMainFormSchema>;

export interface VehicleThirdFormInputs extends VehicleFormInputs, ThirdFormInputs {};
export interface VehicleAuctionFormInputs extends VehicleFormInputs, AuctionFormInputs {};

export type VehicleStatusFormInputs = z.infer<typeof vehicleStatus>;

export function formatVehicle(vehicle: VehicleFistore, statusHistory: VehicleStatusHistoryFirestore[] | null): VehicleFormatted {
  return {
    id: vehicle.id.toUpperCase(),
    brand: vehicle.brand.toUpperCase(),
    model: vehicle.model.toUpperCase(),
    version: vehicle.version ? vehicle.version.toUpperCase() : '-',
    color: vehicle.color.toUpperCase(),
    kilometers: vehicle.kilometers ? `${formatNumber.format(vehicle.kilometers)} Km` : '-',
    chassis: vehicle.chassis ? vehicle.chassis.toUpperCase() : '-',
    modelYear: vehicle.modelYear,
    manufacturingYear: vehicle.manufacturingYear,
    fipe: vehicle.fipe ? vehicle.fipe : 0,
    status: {
      current: vehicle.status,
      history: statusHistory && statusHistory.length > 0 ? statusHistory.map(history => ({
        id: history.id,
        status: history.status,
        startedAt: history.startedAt.toDate(),
        endedAt: history.endedAt?.toDate() ?? null,
        reason: history.reason,
        createdAt: history.createdAt.toDate(),
        updatedAt: history.updatedAt.toDate(),
        statusFormatted: translateEnum('CarStatusType', history.status),
        startedAtAndendedAtFormatted: dateFormatterStatus(history.startedAt.toDate(), history.endedAt?.toDate() ?? null),
        createdAtFormatted: dateFormatter.format(history.createdAt.toDate()),
        updatedAtFormatted: dateFormatter.format(history.updatedAt.toDate()),
      })) : null
    },
    conditionType: vehicle.conditionType,
    images: vehicle.images,
    payment: {
      total: vehicle.payment.total,
      paymentDate: vehicle.payment.paymentDate.toDate(),
      third: vehicle.payment.third ? {
        name: fullNameFormatter(vehicle.payment.third.name),
        cpfCnpj: formatCpfCnpj(vehicle.payment.third.cpfCnpj)
      } : null,
      auction: vehicle.payment.auction ? {
        code: vehicle.payment.auction.code,
        name: vehicle.payment.auction.name,
        consignor: vehicle.payment.auction.consignor,
        damageType: vehicle.payment.auction.damageType,
        functional: vehicle.payment.auction.functional,
        bid: vehicle.payment.auction.bid,
        commission: vehicle.payment.auction.commission,
        administrative: vehicle.payment.auction.administrative,
        others: vehicle.payment.auction.others,
        bidFormatted: currencyFormatter.format(vehicle.payment.auction.bid),
        commissionFormatted: currencyFormatter.format(vehicle.payment.auction.commission),
        administrativeFormatted: currencyFormatter.format(vehicle.payment.auction.administrative),
        othersFormatted: currencyFormatter.format(vehicle.payment.auction.others),
        damageTypeFormatted: translateEnum('DamageType', vehicle.payment.auction.damageType),
        functionalFormatted: translateEnum('AuctionType', vehicle.payment.auction.functional),
      } : null,
      notes: vehicle.payment.notes,
      totalFormatted: currencyFormatter.format(vehicle.payment.total),
      paymentDateFormatted: dateFormatter.format(vehicle.payment.paymentDate.toDate())
    },
    createdAt: vehicle.createdAt.toDate(),
    updatedAt: vehicle.updatedAt.toDate(),
    fipeFormatted: vehicle.fipe ? currencyFormatter.format(vehicle.fipe) : 'Não informado',
    conditionTypeFormatted: translateEnum('CarConditionType', vehicle.conditionType),
    createdAtFormatted: dateFormatter.format(vehicle.createdAt.toDate()),
    updatedAtFormatted: dateFormatter.format(vehicle.updatedAt.toDate()),
  }  
}

export function formatVehiclesSummary(vehicles: VehicleSummaryFirestore[]): VehicleSummaryFormatted[] {
  return vehicles.map(vehicle => ({
    id: vehicle.id.toUpperCase(),
    brand: vehicle.brand,
    model: vehicle.model,
    version: vehicle.version ? vehicle.version : '-',
    color: vehicle.color,
    kilometers: vehicle.kilometers ? `${formatNumber.format(vehicle.kilometers)} Km` : '-',
    conditionType: vehicle.conditionType,
    status: vehicle.status,
    years: vehicle.years,
    hero: vehicle.hero,
    totalPaid: vehicle.totalPaid,
    totalCost: vehicle.totalCost,
    createdAt: vehicle.createdAt.toDate(),
    updatedAt: vehicle.updatedAt.toDate(),
    statusFormatted: translateEnum('CarStatusType', vehicle.status),
    conditionTypeFormatted: translateEnum('CarConditionType', vehicle.conditionType),
    totalPaidFormatted: currencyFormatter.format(vehicle.totalPaid),
    totalCostFormatted: currencyFormatter.format(vehicle.totalCost),
    createdAtFormatted: dateFormatter.format(vehicle.createdAt.toDate()),
    updatedAtFormatted: dateFormatter.format(vehicle.updatedAt.toDate()),
  }))
}

export function formatVehicles(vehicles: VehicleFistore[], statusHistory: VehicleStatusHistoryFirestore[] | null): VehicleFormatted[] {
  return vehicles.map(vehicle => ({
    id: vehicle.id.toUpperCase(),
    brand: vehicle.brand.toUpperCase(),
    model: vehicle.model.toUpperCase(),
    version: vehicle.version ? vehicle.version.toUpperCase() : '-',
    color: vehicle.color.toUpperCase(),
    kilometers: vehicle.kilometers ? `${formatNumber.format(vehicle.kilometers)} Km` : '-',
    chassis: vehicle.chassis ? vehicle.chassis.toUpperCase() : '-',
    modelYear: vehicle.modelYear,
    manufacturingYear: vehicle.manufacturingYear,
    fipe: vehicle.fipe ? vehicle.fipe : 0,
    status: {
      current: vehicle.status,
      history: statusHistory && statusHistory.length > 0 ? statusHistory.map(history => ({
        id: history.id,
        status: history.status,
        startedAt: history.startedAt.toDate(),
        endedAt: history.endedAt?.toDate() ?? null,
        reason: history.reason,
        createdAt: history.createdAt.toDate(),
        updatedAt: history.updatedAt.toDate(),
        statusFormatted: translateEnum('CarStatusType', history.status),
        startedAtAndendedAtFormatted: dateFormatterStatus(history.startedAt.toDate(), history.endedAt?.toDate() ?? null),
        createdAtFormatted: dateFormatter.format(history.createdAt.toDate()),
        updatedAtFormatted: dateFormatter.format(history.updatedAt.toDate()),
      })) : null
    },
    conditionType: vehicle.conditionType,
    images: vehicle.images,
    payment: {
      total: vehicle.payment.total,
      paymentDate: vehicle.payment.paymentDate.toDate(),
      third: vehicle.payment.third ? {
        name: fullNameFormatter(vehicle.payment.third.name),
        cpfCnpj: formatCpfCnpj(vehicle.payment.third.cpfCnpj)
      } : null,
      auction: vehicle.payment.auction ? {
        code: vehicle.payment.auction.code,
        name: vehicle.payment.auction.name,
        consignor: vehicle.payment.auction.consignor,
        damageType: vehicle.payment.auction.damageType,
        functional: vehicle.payment.auction.functional,
        bid: vehicle.payment.auction.bid,
        commission: vehicle.payment.auction.commission,
        administrative: vehicle.payment.auction.administrative,
        others: vehicle.payment.auction.others,
        bidFormatted: currencyFormatter.format(vehicle.payment.auction.bid),
        commissionFormatted: currencyFormatter.format(vehicle.payment.auction.commission),
        administrativeFormatted: currencyFormatter.format(vehicle.payment.auction.administrative),
        othersFormatted: currencyFormatter.format(vehicle.payment.auction.others),
        damageTypeFormatted: translateEnum('DamageType', vehicle.payment.auction.damageType),
        functionalFormatted: translateEnum('AuctionType', vehicle.payment.auction.functional),
      } : null,
      notes: vehicle.payment.notes,
      totalFormatted: currencyFormatter.format(vehicle.payment.total),
      paymentDateFormatted: dateFormatter.format(vehicle.payment.paymentDate.toDate())
    },
    createdAt: vehicle.createdAt.toDate(),
    updatedAt: vehicle.updatedAt.toDate(),
    fipeFormatted: vehicle.fipe ? currencyFormatter.format(vehicle.fipe) : 'Não informado',
    conditionTypeFormatted: translateEnum('CarConditionType', vehicle.conditionType),
    statusFormatted: translateEnum('CarStatusType', vehicle.status),
    createdAtFormatted: dateFormatter.format(vehicle.createdAt.toDate()),
    updatedAtFormatted: dateFormatter.format(vehicle.updatedAt.toDate()),
  }))
}