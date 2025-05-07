import { api } from '@/apis/api'
import { PartName } from '@/types/part'
import { UserResponseSchema, UserResponseType } from '@/types/user'
import { camelizeSchema } from '@/utils/zod'
import { useQueryClient } from '@tanstack/react-query'

interface EditUserProps {
  email: string
  id: number
  nickname: string
  part: PartName
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

export const useMeInvalidation = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: ['me'],
    })
  }
}
