import z from 'zod'
import { DocumentReference, Timestamp } from "firebase/firestore"
import { selectCustomerFormSchema, registerCustomerFormSchema } from '../validations/Customer'

export interface CustomerRequestBody {
  name: string
  whatsapp: string
}

export interface CustomerDocData {
  name: string
  whatsapp: string
  createdAt: Date
  updatedAt: Date
}

export interface CustomerFormatted {
  id: string
  name: string
  whatsapp: string
  createdAt: Date
  updatedAt: Date
  fullName: string
  whatsappFormatted: string
  updatedAtFormatted: string
  createdAtFormatted: string
}

export interface CustomerFistore {
  id: string
  name: string
  whatsapp: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface RegisteredCustomerData {
  id: string
  name: string
}

export type SelectCustomerFormInputs = z.infer<typeof selectCustomerFormSchema>
export type RegisterCustomerFormInputs = z.infer<typeof registerCustomerFormSchema>