import { z } from 'zod'

import { camelizeSchema } from '@/utils/zod'

export const userRole = ['USER', 'ADMIN'] as const
export type UserRoleType = (typeof userRole)[number]

export const UserResponseSchema = z.object({
  email: z.string(),
  nickname: z.string(),
  part: z.string(),
  id: z.number(),
  role: z.enum(userRole),
  accesses: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
  is_active: z.boolean(),
})
export type UserResponseType = z.infer<typeof UserResponseSchema>

export const UserSchema = camelizeSchema(UserResponseSchema)
export type UserType = z.infer<typeof UserSchema>
