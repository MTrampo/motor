import { HttpStatusEnum } from "../enums/Api"

export interface ApiProps<K = Record<string, unknown>> {
  body?: K | null;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  cache?: RequestCache;
  token?: string;
}

export type ResponseProps<T> = {
  status: HttpStatusEnum;
  title: string;
  message: string;
  data: T | null;
}

export interface ErrorResponse {
  status: HttpStatusEnum;
  title: string;
  message: string;
  data: null;
}

export type ResponseFirebaseProps<T> = {
  message: string;
  data: T | null;
}

export interface SWRAPIError extends Error {
  info: ErrorResponse;
  status: number;
}