import { z } from 'zod'

import { UserResponseSchema } from '@/types/user'
import { camelizeSchema } from '@/utils/zod'

export const ApplicationResponseSchema = z.object({
  description: z.string(),
  id: z.number(),
  name: z.string(),
  user: UserResponseSchema.pick({
    email: true,
    nickname: true,
    part: true,
    avatar_id: true,
  }),
  applied_deployment_id: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
})
export type ApplicationResponseType = z.infer<typeof ApplicationResponseSchema>

export const ApplicationSchema = camelizeSchema(ApplicationResponseSchema)
export type ApplicationType = z.infer<typeof ApplicationSchema>
