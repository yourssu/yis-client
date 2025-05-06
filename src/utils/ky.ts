import { HTTPError } from 'ky'

export const isKyHTTPError = (e: any): e is HTTPError => e instanceof HTTPError

export const getKyHTTPErrorMessage = async (e: HTTPError) => {
  const { type, json, body } = e.response

  if (!body) {
    return e.message
  }

  if (type.includes('json')) {
    return (await json<{ message: string }>()).message
  }

  if (type.includes('text')) {
    return await e.response.text()
  }

  return undefined
}
