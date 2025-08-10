import { DocumentReference, Timestamp } from "firebase-admin/firestore"
import { VehicleFistore, VehicleFormatted, formatVehicle } from "./Vehicle"
import { dateFormatter, dateTimeFormatter } from "../utils/formatter"
import { serviceFormSchema } from "../validations/Service"
import { z } from "zod"

export interface ServiceRequestBody {
  day: Date
  duration: number
  budgetId: string
}

export interface ServiceDocData {
  day: Date
  duration: number
  budgetRef?: DocumentReference
  createdAt: Date
  updatedAt: Date
}

export interface ServiceFistore {
  id: string
  day: Timestamp
  duration: number
  budgetRef: DocumentReference
  budget: VehicleFistore | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface ServiceFormatted {
  id: string
  day: Date
  budget: VehicleFormatted | null
  createdAt: Date
  updatedAt: Date
  dayFormatted: string
  dayFormattedDynamic?: string
  updatedAtFormatted: string
  createdAtFormatted: string
}

export type ServiceFormInputs = {
  day: Date
  time: string
  duration: string
}

export type ReturnBookedSlots = {
  start: Date
  end: Date
}

export function formatServices(services: ServiceFistore[]): ServiceFormatted[] {
  return services.map(service => ({
    id: service.id,
    day: service.day.toDate(),
    createdAt: service.createdAt.toDate(),
    updatedAt: service.updatedAt.toDate(),
    budget: service.budget ? formatVehicle(service.budget) : null,
    dayFormatted: dateTimeFormatter(service.day.toDate()),
    createdAtFormatted: dateFormatter.format(service.createdAt.toDate()),
    updatedAtFormatted: dateFormatter.format(service.updatedAt.toDate()),
  }))
}