import useSWR from "swr"
import { fetcher } from "@/commons/lib/fetcher/swr"
import { ResponseProps, SWRAPIError } from "@/commons/models/Api"
import { VehicleFormatted } from "@/commons/models/Vehicle"

export function useGetAllVehicles() {
  const { data, error, isLoading } = useSWR<ResponseProps<VehicleFormatted[]>, SWRAPIError>('/api/financial/vehicle', fetcher)
 
  return {
    vehicles: data?.data,
    isLoading,
    error: error
  }
}

export function useGetVehicleById(id: string) {
  const { data, error, isLoading } = useSWR<ResponseProps<VehicleFormatted>, SWRAPIError>(`/api/financial/vehicle/${id}`, fetcher)
 
  return {
    vehicle: data?.data,
    isLoading,
    error: error
  }
}