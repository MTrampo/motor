import useSWR from "swr"
import useSWRMutation from 'swr/mutation';
import { fetcherSWR } from "@/commons/lib/fetcher/swr"
import { ResponseProps } from "@/commons/models/Api"
import { LoggedInUserFormatted } from "@/commons/models/User"
import { ApiError } from "@/commons/errors/api";
import { toast } from "sonner";

export function useGetRegisteredUserSWR() {
  const { data, error, isLoading } = useSWR<ResponseProps<LoggedInUserFormatted>, ApiError>('/api/account/user', fetcherSWR, {
    onError: (err) => {
      toast.error(err.title, { description: err.message })
    },
    shouldRetryOnError: false, // impede tentativas automáticas
  })
 
  return {
    user: data?.data ?? null,
    isLoading,
    error
  }
}

export function useTriggerGetRegisteredUser() {
  const { trigger, error, isMutating } = useSWRMutation<ResponseProps<LoggedInUserFormatted>, ApiError>('/api/account/user', fetcherSWR)
 
  return {
    triggerGetRegisteredUser: trigger, 
    isMutating,
    error
  }
}