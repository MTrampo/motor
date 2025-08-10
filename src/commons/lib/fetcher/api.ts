import { HttpStatusEnum } from "../../enums/Api"
import { ApiProps, ResponseProps } from "../../models/Api"

const api = async <T>(
  path: string,
  { body = null, method, type = 'client', cache = 'no-store', token }: ApiProps
): Promise<ResponseProps<T>> => {
  const url = type === 'server' ? `${process.env.APP_URL}${path}` : path

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
    credentials: type === 'server' ? 'include' : 'same-origin',
    body: body ? JSON.stringify(body) : null,
  })

  if (!result.ok) {
    const errorText = await result.text()
    throw new Error(`Erro ${result.status}: ${errorText}`)
  }

  const json = await result.json()

  return {
    status: json.status as HttpStatusEnum,
    title: json.title as string,
    message: json.message as string,
    data: json.data as T,
  }
}

export default api