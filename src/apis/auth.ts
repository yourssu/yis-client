import { z } from 'zod'

import { api } from '@/apis/api'
import { TokenResponseSchema } from '@/types/auth'
import { UserResponseSchema, UserResponseType } from '@/types/user'
import { removeAuthTokens } from '@/utils/auth'
import { camelizeSchema } from '@/utils/zod'

interface SignupProps {
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
  const res = await api.post<UserResponseType>('auth', { json: props }).json()
  return camelizeSchema(UserResponseSchema).parse(res)
}

export const signin = async (props: SigninProps) => {
  const formData = new FormData()
  formData.append('username', props.email)
  formData.append('password', props.password)

  const res = await api.post<SigninResponse>('auth/login', { body: formData }).json()
  return camelizeSchema(SigninResponseSchema).parse(res)
}

export const signout = () => {
  removeAuthTokens()
}
