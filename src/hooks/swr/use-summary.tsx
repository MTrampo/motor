import { ApiError } from "@/commons/errors/api"
import { fetcherSWR } from "@/commons/lib/fetcher/swr"
import { ResponseProps } from "@/commons/models/Api"
import { FinanceComparisonFormatted } from "@/commons/models/Finance"
import useSWR from "swr"

export function useGetFinancialSummarySWR() {
  const { data, error, isLoading } = useSWR<ResponseProps<FinanceComparisonFormatted>, ApiError>(`/api/financial/summary`, fetcherSWR)
 
  return {
    finance: data?.data,
    isLoading,
    error: error
  }
}