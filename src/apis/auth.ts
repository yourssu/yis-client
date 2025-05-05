import { z } from 'zod'

import { api } from '@/apis/api'
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

const SignupResponseSchema = z.object({
  email: z.string(),
  nickname: z.string(),
  part: z.string(),
  id: z.number(),
  role: z.enum(['USER', 'ADMIN']),
  accesses: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
})

type SignupResponse = z.infer<typeof SignupResponseSchema>

const SigninResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
})

type SigninResponse = z.infer<typeof SigninResponseSchema>

export const signup = async (props: SignupProps) => {
  const res = await api.post<SignupResponse>('auth', { json: props }).json()
  return camelizeSchema(SignupResponseSchema).parse(res)
}

export const signin = async (props: SigninProps) => {
  const formData = new FormData()
  formData.append('username', props.email)
  formData.append('password', props.password)

  const res = await api.post<SigninResponse>('auth/login', { body: formData }).json()
  return camelizeSchema(SigninResponseSchema).parse(res)
}
