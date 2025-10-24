import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { HttpStatusEnum } from "../enums/Api"
import { ApiError } from "../errors/api";

export interface MutatorArgs<K> {
  arg: {
    method: 'POST' | 'PUT' | 'DELETE'; // Apenas métodos de mutação
    body: K; // O corpo da requisição (payload)
    token?: string; // Se precisar de token, pode incluir aqui
  };
}

export interface ApiProps<K = Record<string, unknown>> {
  body?: K | null;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  cache?: RequestCache;
  token?: string;
}

export type ResponseProps<T> = {
  title: string;
  message: string;
  data: T | null;
}

export type ResponseFirebaseProps<T> = {
  message: string;
  data: T | null;
}
