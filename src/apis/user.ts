import { api } from '@/apis/api'
import { PartName } from '@/types/part'
import { UserResponseSchema, UserResponseType } from '@/types/user'
import { camelizeSchema } from '@/utils/zod'

interface EditUserProps {
  email: string
  nickname: string
  part: PartName
  userId: number
}

export const editUser = async ({ userId, ...body }: EditUserProps) => {
  const res = await api
    .put<UserResponseType>(`users/${userId}`, {
      json: body,
    })
    .json()
  return camelizeSchema(UserResponseSchema).parse(res)
}
