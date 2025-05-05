import { z } from 'zod'

import { api } from '@/apis/api'
import { camelizeSchema } from '@/utils/zod'

interface SignupProps {
  email: string
  nickname: string
  part: string
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

export const signup = async (props: SignupProps) => {
  const res = await api.post<SignupResponse>('auth', { json: props }).json()
  return camelizeSchema(SignupResponseSchema).parse(res)
}
