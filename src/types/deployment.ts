import { z } from 'zod'

import { camelizeSchema } from '@/utils/zod'

export const DeploymentStateNames = ['REQUEST', 'RETURN', 'APPROVAL'] as const
export type DeploymentStateNames = (typeof DeploymentStateNames)[number]

export const DeploymentResponseSchema = z.object({
  domain_name: z.string(),
  cpu_requests: z.string(),
  memory_requests: z.string(),
  cpu_limits: z.string(),
  memory_limits: z.string(),
  port: z.number(),
  image_url: z.string(),
  replicas: z.number(),
  message: z.string().nullable(),
  id: z.number(),
  application_id: z.number(),
  comment: z.string().nullable(),
  is_applied: z.boolean(),
  state: z.enum(DeploymentStateNames),
  user_id: z.number(),
  admin_id: z.number().nullable(),
  // manifests: z.array() // Todo: 메니페스트 타입 구현하기
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
})
export type DeploymentResponseType = z.infer<typeof DeploymentResponseSchema>

export const DeploymentSchema = camelizeSchema(DeploymentResponseSchema)
export type DeploymentType = z.infer<typeof DeploymentSchema>
