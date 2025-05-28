import { z } from 'zod/v4'

import { api } from '@/apis/api'
import { TokenResponseSchema } from '@/types/auth'
import { UserResponseType, UserSchema } from '@/types/user'
import { removeAuthTokens } from '@/utils/auth'
import { camelizeSchema, optionalizeSchema } from '@/utils/zod'

interface SignupProps {
  avatarId: number
  email: string
  nickname: string
  part: string
  password: string
}

interface SigninProps {
  email: string
  password: string
}

const SigninResponseSchema = TokenResponseSchema
type SigninResponse = z.infer<typeof SigninResponseSchema>

export const signup = async (props: SignupProps) => {
  const { avatarId, ...others } = props

  const res = await api
    .post<UserResponseType>('auth', {
      json: {
        ...others,
        avatar_id: avatarId,
      },
    })
    .json()
  return UserSchema.parse(res)
}

export const signin = async (props: SigninProps) => {
  const formData = new FormData()
  formData.append('username', props.email)
  formData.append('password', props.password)

  const res = await api.post<SigninResponse>('auth/login', { body: formData }).json()
  return optionalizeSchema(camelizeSchema(SigninResponseSchema)).parse(res)
}

export const signout = () => {
  removeAuthTokens()
}
