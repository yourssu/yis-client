import { z } from 'zod'

import { UserResponseSchema } from '@/types/user'
import { ambiguousZodEnum, camelizeSchema } from '@/utils/zod'

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

export const ApplicationClusterStatusResponseSchema = z.object({
  application_id: z.number(),
  name: z.string(),
  ready_replicas: z.number(),
  total_replicas: z.number(),
  available_replicas: z.number(),
  updated_replicas: z.number(),
  // conditions: 필요없음
  pods: z.array(
    z.object({
      name: z.string(),
      ready: z.boolean(),
      status: ambiguousZodEnum(['Running', 'Pending', 'ContainerCreating'], 'Unknown-Status'),
      restarts: z.number(),
      age: z.string(),
    })
  ),
  age: z.string(),
})
export type ApplicationClusterStatusResponseType = z.infer<
  typeof ApplicationClusterStatusResponseSchema
>
export const ApplicationClusterStatusSchema = camelizeSchema(ApplicationClusterStatusResponseSchema)
export type ApplicationClusterStatusType = z.infer<typeof ApplicationClusterStatusSchema>
