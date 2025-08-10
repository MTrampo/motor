import { HttpStatusEnum } from "@/commons/enums/api";
import { ErrorResponse, ResponseProps, SWRAPIError } from "@/commons/models/Api";

export const fetcher = async <T>(url: string): Promise<ResponseProps<T>> => {
  const res = await fetch(url);

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();  
    const error = new Error(errorData.message) as SWRAPIError;
    error.info = errorData;
    error.status = res.status;

    throw error;
  }

  const json = await res.json();
  return {
    status: json.status as HttpStatusEnum,
    title: json.title as string,
    message: json.message as string,
    data: json.data as T,
  };
}

export const fetcherWithToken = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => res.json());