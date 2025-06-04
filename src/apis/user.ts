import { z } from 'zod/v4'

import { api } from '@/apis/api'
import { getApplicationClusterStatus, getApplicationDeployments } from '@/apis/application'
import { userKey } from '@/apis/keys'
import { ApplicationResponseType, ApplicationSchema } from '@/types/application'
import { PaginatedSchema, PaginationParams } from '@/types/pagination'
import { PartNames } from '@/types/part'
import { UserResponseType, UserSchema } from '@/types/user'
import { omitByNullish } from '@/utils/misc'
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
  return UserSchema.parse(res)
}

export const getUser = async (userId: number) => {
  const res = await api.get<UserResponseType>(`users/${userId}`).json()
  return UserSchema.parse(res)
}

export const getMe = async () => {
  const res = await api.get<UserResponseType>(`auth/me`).json()
  return UserSchema.parse(res)
}

export const getUserApplications = async ({ userId }: GetUserApplicationsProps) => {
  const res = await api.get<ApplicationResponseType[]>(`users/${userId}/applications`).json()
  return z.array(ApplicationSchema).parse(res)
}

export const getUserFullApplications = async ({ userId }: GetUserApplicationsProps) => {
  const applications = await getUserApplications({ userId })
  const recentDeployments = await Promise.all(
    applications.map(async ({ id }) => {
      const [deployments, clusterStatus] = await Promise.all([
        getApplicationDeployments({
          applicationId: id,
          orderBy: 'UPDATED_AT_DESC',
        }),
        getApplicationClusterStatus(id),
      ])
      return {
        recentDeployment: deployments.data[0],
        clusterStatus,
      }
    })
  )
  return applications.map((application, index) => ({
    ...application,
    recentDeployment: recentDeployments[index].recentDeployment,
    clusterStatus: recentDeployments[index].clusterStatus,
  }))
}

export const getAllUsers = async ({ limit = 100, skip = 0, orderBy }: PaginationParams) => {
  const res = await api
    .get<UserResponseType[]>(`users/`, {
      searchParams: omitByNullish({
        limit,
        skip,
        orderBy,
      }),
    })
    .json()
  return PaginatedSchema(UserSchema).parse(res)
}

export const deleteUser = async (userId: number) => {
  const res = await api.delete(`users/${userId}`).json()
  return UserSchema.parse(res)
}

export const useMeInvalidation = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: userKey.me(),
    })
  }
}

export const useUserInvalidation = (userId: number) => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: userKey.detail(userId),
    })
  }
}

export const useAllUsersInvalidation = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: userKey.all,
    })
  }
}

export const useUserApplicationsInvalidation = (userId: number) => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: userKey.applications(userId),
    })
  }
}
