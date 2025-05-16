import { z } from 'zod'

import { api } from '@/apis/api'
import { getApplicationDeployments } from '@/apis/application'
import { ApplicationResponseSchema, ApplicationResponseType } from '@/types/application'
import { PartNames } from '@/types/part'
import { UserResponseSchema, UserResponseType } from '@/types/user'
import { camelizeSchema } from '@/utils/zod'
import { useQueryClient } from '@tanstack/react-query'

interface EditUserProps {
  avatarId: number
  email: string
  id: number
  nickname: string
  part: PartNames
}

type GetUserApplicationsProps = {
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

export const getUserApplications = async ({ userId }: GetUserApplicationsProps) => {
  const res = await api.get<ApplicationResponseType[]>(`users/${userId}/applications`).json()
  return camelizeSchema(z.array(ApplicationResponseSchema)).parse(res)
}

export const getUserApplicationsWithRecentDeployment = async ({
  userId,
}: GetUserApplicationsProps) => {
  const applications = await getUserApplications({ userId })
  const recentDeployments = await Promise.all(
    applications.map(async ({ id }) => {
      const { data } = await getApplicationDeployments({
        applicationId: id,
        orderBy: 'UPDATED_AT_DESC',
      })
      return data[0]
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
