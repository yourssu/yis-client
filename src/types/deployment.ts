import { z } from 'zod/v4'

import { CPUResourceValueNames, MemoryResourceNames } from '@/types/resource'
import { camelizeSchema, optionalizeSchema, zodISODateString } from '@/utils/zod'

export const DeploymentStateNames = ['REQUEST', 'RETURN', 'APPROVAL'] as const
export type DeploymentStateNames = (typeof DeploymentStateNames)[number]

export const DeploymentStateKRNameMap = {
  REQUEST: '요청',
  APPROVAL: '승인',
  RETURN: '거절',
} as const satisfies Record<DeploymentStateNames, string>

export const DeploymentManifestResponseSchema = z.object({
  file_name: z.string(),
  content: z.string(),
})
export type DeploymentManifestResponseType = z.infer<typeof DeploymentManifestResponseSchema>
export const DeploymentManifestSchema = optionalizeSchema(
  camelizeSchema(DeploymentManifestResponseSchema)
)
export type DeploymentManifestType = z.infer<typeof DeploymentManifestSchema>

export const DeploymentResponseSchema = z.object({
  domain_name: z.string(),
  cpu_requests: z.enum(CPUResourceValueNames),
  memory_requests: z.enum(MemoryResourceNames),
  cpu_limits: z.enum(CPUResourceValueNames),
  memory_limits: z.enum(MemoryResourceNames),
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
  manifests: z.array(DeploymentManifestResponseSchema).nullable(),
  created_at: zodISODateString(),
  updated_at: zodISODateString(),
  deleted_at: zodISODateString().nullable(),
})
export type DeploymentResponseType = z.infer<typeof DeploymentResponseSchema>

export const DeploymentSchema = optionalizeSchema(camelizeSchema(DeploymentResponseSchema))
export type DeploymentType = z.infer<typeof DeploymentSchema>
