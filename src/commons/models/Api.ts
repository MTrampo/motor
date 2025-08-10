import { HttpStatusEnum } from "../enums/api"

export interface ApiProps {
  body?: any;
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
  data: any;
}

export type ResponseFirebaseProps<T> = {
  message: string;
  data: T | null;
}

export interface SWRAPIError extends Error {
  info: ErrorResponse;
  status: number;
}