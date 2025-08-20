import { fetcher } from "@/commons/lib/fetcher/swr"
import { ResponseProps, SWRAPIError } from "@/commons/models/Api"
import { CostFormatted } from "@/commons/models/Cost"
import useSWR from "swr"

export function useGetCostByPlate(id: string) {
  const { data, error, isLoading } = useSWR<ResponseProps<CostFormatted>, SWRAPIError>(`/api/financial/cost/${id}`, fetcher)

  return {
    cost: data?.data,
    isLoading,
    error: error
  }
}