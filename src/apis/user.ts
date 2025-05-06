import { api } from '@/apis/api'
import { PartName } from '@/types/part'
import { UserResponseSchema, UserResponseType } from '@/types/user'
import { camelizeSchema } from '@/utils/zod'

interface EditUserProps {
  email: string
  nickname: string
  part: PartName
}

export const editUser = async (body: EditUserProps) => {
  const res = await api
    .put<UserResponseType>(`users/0`, {
      // Todo: 아무 아이디나 던져줘도 상관없음
      json: body,
    })
    .json()
  return camelizeSchema(UserResponseSchema).parse(res)
}
