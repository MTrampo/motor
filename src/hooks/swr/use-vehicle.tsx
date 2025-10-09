import useSWR from "swr"
import { fetcherSWR } from "@/commons/lib/fetcher/swr"
import { ResponseProps } from "@/commons/models/Api"
import { VehicleFormatted, VehicleSummaryFormatted } from "@/commons/models/Vehicle"
import { ApiError } from "@/commons/errors/api"

export function useGetAllVehiclesSWR() {
  const { data, error, isLoading } = useSWR<ResponseProps<VehicleSummaryFormatted[]>, ApiError>('/api/financial/vehicle', fetcherSWR)
 
  return {
    vehicles: data?.data,
    isLoading,
    error: error
  }
}

export function useGetVehicleByIdSWR(id: string) {
  const { data, error, isLoading, mutate } = useSWR<ResponseProps<VehicleFormatted>, ApiError>(`/api/financial/vehicle/${id}`, fetcherSWR)
 
  return {
    vehicle: data?.data,
    isLoading,
    mutate,
    error: error
  }
}