import { z } from 'zod'

import { DeploymentResponseSchema } from '@/types/deployment'
import { UserResponseSchema } from '@/types/user'
import { ambiguousZodEnum, camelizeSchema, zodISODateString } from '@/utils/zod'

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
  created_at: zodISODateString(),
  updated_at: zodISODateString(),
  deleted_at: zodISODateString().nullable(),
})
export type ApplicationResponseType = z.infer<typeof ApplicationResponseSchema>
export const ApplicationSchema = camelizeSchema(ApplicationResponseSchema)
export type ApplicationType = z.infer<typeof ApplicationSchema>

export const ApplicationClusterPodSchema = z.object({
  name: z.string(),
  ready: z.boolean(),
  status: ambiguousZodEnum(
    ['Running', 'Pending', 'ContainerCreating', 'CrashLoopBackOff', 'ImagePullBackOff', 'Failed'],
    'Unknown-Status'
  ),
  restarts: z.number(),
  age: z.string(),
})
export type ApplicationClusterPodType = z.infer<typeof ApplicationClusterPodSchema>

const BaseApplicationClusterConditionSchema = z.object({
  status: ambiguousZodEnum(['True', 'False'], 'Unknown-Status'),
  last_update: zodISODateString(),
  message: z.string(),
})

export const ApplicationClusterConditionSchema = z.union([
  BaseApplicationClusterConditionSchema.extend({
    type: z.literal('Available'),
    reason: ambiguousZodEnum(['MinimumReplicasAvailable', 'MinimumReplicasUnavailable'], (v) => v),
  }),
  BaseApplicationClusterConditionSchema.extend({
    type: z.literal('Progressing'),
    reason: ambiguousZodEnum(
      ['ReplicaSetUpdated', 'NewReplicaSetAvailable', 'ProgressDeadlineExceeded'],
      (v) => v
    ),
  }),
])

export const ApplicationClusterStatusResponseSchema = z.object({
  application_id: z.number(),
  name: z.string(),
  ready_replicas: z.number(),
  total_replicas: z.number(),
  available_replicas: z.number(),
  updated_replicas: z.number(),
  conditions: z.array(ApplicationClusterConditionSchema),
  pods: z.array(ApplicationClusterPodSchema),
  age: z.string(),
})
export type ApplicationClusterStatusResponseType = z.infer<
  typeof ApplicationClusterStatusResponseSchema
>
export const ApplicationClusterStatusSchema = camelizeSchema(ApplicationClusterStatusResponseSchema)
export type ApplicationClusterStatusType = z.infer<typeof ApplicationClusterStatusSchema>

export const FullApplicationResponseSchema = ApplicationResponseSchema.extend({
  recentDeployment: DeploymentResponseSchema,
  clusterStatus: ApplicationClusterStatusResponseSchema,
})
export type FullApplicationResponseType = z.infer<typeof FullApplicationResponseSchema>
export const FullApplicationSchema = camelizeSchema(FullApplicationResponseSchema)
export type FullApplicationType = z.infer<typeof FullApplicationSchema>
