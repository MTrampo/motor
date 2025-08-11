import { HttpStatusEnum } from "../enums/Api"

export interface ApiProps {
  body?: Record<string, unknown> | null;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  type?: 'server' | 'client';
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
