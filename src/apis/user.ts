import { z } from 'zod'

import { api } from '@/apis/api'
import { ApplicationResponseSchema, ApplicationResponseType } from '@/types/application'
import { PartNames } from '@/types/part'
import { UserResponseSchema, UserResponseType } from '@/types/user'
import { PaginationParams } from '@/utils/ky'
import { camelizeSchema } from '@/utils/zod'
import { useQueryClient } from '@tanstack/react-query'

interface EditUserProps {
  email: string
  id: number
  nickname: string
  part: PartNames
}

export const editUser = async (props: EditUserProps) => {
  const { id, ...body } = props

  const res = await api
    .put<UserResponseType>(`users/${id}`, {
      json: body,
    })
    .json()
  return camelizeSchema(UserResponseSchema).parse(res)
}

export const getMe = async () => {
  const res = await api.get<UserResponseType>(`auth/me`).json()
  return camelizeSchema(UserResponseSchema).parse(res)
}

export const getUserApplications = async ({
  limit = 5,
  userId,
  skip = 0,
}: PaginationParams & { userId: number }) => {
  const res = await api
    .get<ApplicationResponseType>(`users/${userId}/applications`, {
      searchParams: {
        limit,
        skip,
      },
    })
    .json()
  return camelizeSchema(z.array(ApplicationResponseSchema)).parse(res)
}

export const useMeInvalidation = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: ['me'],
    })
  }
}
