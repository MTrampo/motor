import { fetcher } from "@/commons/lib/fetcher/swr"
import { ResponseProps, SWRAPIError } from "@/commons/models/Api"
import { FinanceComparisonFormatted } from "@/commons/models/Finance"
import useSWR from "swr"

export function useGetFinancialSummarySWR() {
  const { data, error, isLoading } = useSWR<ResponseProps<FinanceComparisonFormatted>, SWRAPIError>(`/api/financial/summary`, fetcher)
 
  return {
    finance: data?.data,
    isLoading,
    error: error
  }
}