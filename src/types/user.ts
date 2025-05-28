import { z } from 'zod/v4'

import { PartNames } from '@/types/part'
import { camelizeSchema, optionalizeSchema, zodISODateString } from '@/utils/zod'

export const userRole = ['USER', 'ADMIN'] as const
export type UserRoleType = (typeof userRole)[number]

export const UserResponseSchema = z.object({
  email: z.string(),
  nickname: z.string(),
  part: z.enum(PartNames),
  id: z.number(),
  role: z.enum(userRole),
  accesses: z.array(z.string()),
  created_at: zodISODateString(),
  updated_at: zodISODateString(),
  deleted_at: zodISODateString().nullable(),
  is_active: z.boolean(),
  avatar_id: z.number(),
})
export type UserResponseType = z.infer<typeof UserResponseSchema>
export const UserSchema = optionalizeSchema(camelizeSchema(UserResponseSchema))
export type UserType = z.infer<typeof UserSchema>
