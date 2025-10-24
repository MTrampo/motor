import { ApiError } from "@/commons/errors/api";
import { MutatorArgs, ResponseProps } from "@/commons/models/Api";

export async function fetcherSWR<T>(url: string): Promise<T> {
  const res = await fetch(url);
  let json = null;

  try {
    json = await res.json();
  } catch {}

  if (!res.ok) {
    throw new ApiError(
      json?.title ?? "Erro inesperado",
      json?.message ?? res.statusText,
      res.status,
      json
    );
  }

  return json as T;
}

export async function mutationSWR<T, K>(
  url: string,
  { arg }: MutatorArgs<K>
): Promise<ResponseProps<T>> {
  const { method, body, token } = arg;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(url, {
    method,
    headers,
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });

  let json = null;

  try {
    json = await res.json();
  } catch (err) {
    // Em alguns casos, a API pode retornar um status de erro sem body JSON.
    if (!res.ok) {
        throw new ApiError(
            `Erro ${res.status}`,
            res.statusText || "Erro inesperado",
            res.status,
            err
        );
    }
    // Se não for erro, e o parse falhou, pode ser um retorno 204 (No Content), etc.
  }

  // Tratamento de erro padronizado (usando sua classe ApiError)
  if (!res.ok) {
    throw new ApiError(
      json?.title ?? "Erro na requisição",
      json?.message ?? res.statusText,
      res.status,
      json
    );
  }

  // Seu padrão de retorno para sucesso
  return {
    title: json.title as string,
    message: json.message as string,
    data: json.data as T,
  } as ResponseProps<T>;
}