import useSWR from "swr"
import useSWRMutation from 'swr/mutation';
import { fetcher } from "@/commons/lib/fetcher/swr"
import { ResponseProps, SWRAPIError } from "@/commons/models/Api"
import { LoggedInUserFormatted } from "@/commons/models/User"

export function useGetRegisteredUserSWR() {
  const { data, error, isLoading } = useSWR<ResponseProps<LoggedInUserFormatted>, SWRAPIError>('/api/account/user', fetcher)
 
  return {
    user: data?.data,
    isLoading,
    error: error
  }
}

export function useTriggerGetRegisteredUser() {
  const { trigger, error, isMutating } = useSWRMutation<ResponseProps<LoggedInUserFormatted>, SWRAPIError>('/api/account/user', fetcher)
 
  return {
    triggerGetRegisteredUser: trigger, 
    isMutating,
    error
  }
}