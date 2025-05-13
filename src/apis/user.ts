import { compareDesc } from 'date-fns'
import { z } from 'zod'

import { api } from '@/apis/api'
import { getApplicationDeployments } from '@/apis/application'
import { ApplicationResponseSchema, ApplicationResponseType } from '@/types/application'
import { PartNames } from '@/types/part'
import { UserResponseSchema, UserResponseType } from '@/types/user'
import { PaginationParams } from '@/utils/ky'
import { camelizeSchema } from '@/utils/zod'
import { useQueryClient } from '@tanstack/react-query'

interface EditUserProps {
  avatarId: number
  email: string
  id: number
  nickname: string
  part: PartNames
}

type GetUserApplicationsProps = PaginationParams & {
  userId: number
}

export const editUser = async (props: EditUserProps) => {
  const { id, avatarId, ...body } = props

  const res = await api
    .put<UserResponseType>(`users/${id}`, {
      json: {
        ...body,
        avatar_id: avatarId,
      },
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
}: GetUserApplicationsProps) => {
  const res = await api
    .get<ApplicationResponseType[]>(`users/${userId}/applications`, {
      searchParams: {
        limit,
        skip,
      },
    })
    .json()
  return camelizeSchema(z.array(ApplicationResponseSchema)).parse(res)
}

export const getUserApplicationsWithRecentDeployment = async ({
  userId,
  limit = 5,
  skip = 0,
}: GetUserApplicationsProps) => {
  const applications = await getUserApplications({ userId, limit, skip })
  const recentDeployments = await Promise.all(
    applications.map(async ({ id }) => {
      const deployments = await getApplicationDeployments({ applicationId: id })
      return [...deployments].sort((a, b) => compareDesc(a.updatedAt, b.updatedAt))[0]
    })
  )
  return applications.map((application, index) => ({
    ...application,
    recentDeployment: recentDeployments[index],
  }))
}

export const useMeInvalidation = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: ['me'],
    })
  }
}
