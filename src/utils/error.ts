import { HTTPError } from 'ky'
import { ZodError } from 'zod'

import { getKyHTTPErrorMessage, isKyHTTPError } from '@/utils/ky'
import { getZodErrorMessage, isZodError } from '@/utils/zod'

export const isError = (error: unknown): error is Error => {
  return error instanceof Error
}

type ErrorResult<TError = unknown> =
  | {
      error: Error
      message: string
      stack?: string
      type: 'Error'
    }
  | {
      error: HTTPError
      message: string
      stack?: string
      type: 'KyHTTPError'
    }
  | {
      error: TError
      message: string
      stack?: undefined
      type: 'Unknown'
    }
  | {
      error: ZodError
      message: string
      stack?: string
      type: 'ZodError'
    }

const defaultErrorMessage = '오류가 발생했어요. 잠시 후 다시 시도해 주세요.'

const errorToResult = async <TError = unknown>(error: TError): Promise<ErrorResult<TError>> => {
  if (isKyHTTPError(error)) {
    return {
      type: 'KyHTTPError',
      error,
      stack: error.stack,
      message: (await getKyHTTPErrorMessage(error)) ?? defaultErrorMessage,
    }
  }
  if (isZodError(error)) {
    return {
      type: 'ZodError',
      error,
      stack: error.stack,
      message: getZodErrorMessage(error) ?? defaultErrorMessage,
    }
  }
  if (isError(error)) {
    return {
      type: 'Error',
      error,
      stack: error.stack,
      message: error.message,
    }
  }
  return {
    error,
    message: typeof error === 'string' ? error : defaultErrorMessage,
    type: 'Unknown',
  }
}

export const handleError = async <TError = unknown>(error: TError) => {
  return await errorToResult(error)
}
