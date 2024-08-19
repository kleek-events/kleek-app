async function request<T>(url: string, config?: RequestInit): Promise<T> {
  const response = await fetch(url, config)
  return await response.json()
}

export const HttpRequest = {
  get: <TResponse>(url: string) => request<TResponse>(url),

  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: 'POST', body }),
}
