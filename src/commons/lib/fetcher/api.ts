import { HttpStatusEnum } from "../../enums/Api"
import { ApiProps, ResponseProps } from "../../models/Api"

const api = async <T, K>(
  url: string,
  { body = null, method, cache = 'no-store', token }: ApiProps<K>
): Promise<ResponseProps<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const result = await fetch(url, {
    method,
    cache,
    headers,
    credentials: 'same-origin',
    body: body ? JSON.stringify(body) : null,
  })

  if (!result.ok) {
    const errorText = await result.text()
    throw new Error(`Erro ${result.status}: ${errorText}`)
  }

  const json = await result.json()

  return {
    title: json.title as string,
    message: json.message as string,
    data: json.data as T,
  }
}

export default api