import { fetcher } from "@/commons/lib/fetcher/swr"
import { ResponseProps, SWRAPIError } from "@/commons/models/Api"
import { FinanceFormatted } from "@/commons/models/Finance"
import useSWR from "swr"

export function getFinancialSummary() {
  const { data, error, isLoading } = useSWR<ResponseProps<FinanceFormatted>, SWRAPIError>(`/api/financial`, fetcher)
 
  return {
    finance: data?.data,
    isLoading,
    error: error
  }
}