import { fetcher } from "@/commons/lib/fetcher/swr"
import { ResponseProps, SWRAPIError } from "@/commons/models/Api"
import { FinanceFormatted } from "@/commons/models/Finance"
import { VehicleFormatted } from "@/commons/models/Vehicle"
import useSWR from "swr"

export function getAllVehicles() {
  const { data, error, isLoading } = useSWR<ResponseProps<VehicleFormatted[]>, SWRAPIError>(`/api/vehicle`, fetcher)
 
  return {
    vehicles: data?.data,
    isLoading,
    error: error
  }
}

export function getFinancialSummary() {
  const { data, error, isLoading } = useSWR<ResponseProps<FinanceFormatted>, SWRAPIError>(`/api/financial`, fetcher)
 
  return {
    finance: data?.data,
    isLoading,
    error: error
  }
}