import { z } from 'zod/v4'

import { CpuResourceNames, MemoryResourceNames } from '@/types/resource'
import { mutable } from '@/utils/misc'
import { regexes } from '@/utils/regex'
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
  cpu_requests: z.enum(CpuResourceNames),
  memory_requests: z.enum(MemoryResourceNames),
  cpu_limits: z.enum(CpuResourceNames),
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

export const DeploymentInfoFormSchema = {
  base: z.object({
    domainName: z.string().min(1, { message: '도메인을 입력해주세요.' }),
    port: z.number(),
    imageUrl: z.string().min(1, { message: '도커 이미지 링크를 입력해주세요.' }),
    message: z.string().optional(),
  }),
  form: () =>
    DeploymentInfoFormSchema.base.extend({
      domainName: DeploymentInfoFormSchema.base.shape.domainName
        .refine((domain) => !(domain.startsWith('http://') || domain.startsWith('https://')), {
          message: '도메인에 http 또는 https가 포함되어 있어요.',
        })
        .refine((domain) => regexes.hostname.test(domain), {
          message: '도메인 형식이 올바르지 않아요.',
        }),
      port: DeploymentInfoFormSchema.base.shape.port
        .min(0, { message: '포트 번호가 올바르지 않아요.' })
        .max(65535, { message: '포트 번호가 올바르지 않아요.' }),
    }),
}

export const DeploymentResourceFormSchema = {
  base: z.object({
    cpuRequests: z.enum(CpuResourceNames),
    cpuLimits: z.enum(CpuResourceNames),
    memoryRequests: z.enum(MemoryResourceNames),
    memoryLimits: z.enum(MemoryResourceNames),
  }),
  form: () =>
    DeploymentResourceFormSchema.base.superRefine((data, ctx) => {
      const checkResourceReversed = <T extends string>(values: T[], request: T, limit: T) => {
        const requestIndex = values.indexOf(request)
        const limitIndex = values.indexOf(limit)
        return requestIndex > limitIndex
      }
      const addResourceIssue = (type: 'cpu' | 'memory') => {
        const issues = {
          cpu: {
            message: 'CPU 요청 리소스는 제한 리소스보다 작거나 같아야 해요.',
            paths: ['cpuRequests', 'cpuLimits'],
          },
          memory: {
            message: '메모리 요청 리소스는 제한 리소스보다 작거나 같아야 해요.',
            paths: ['memoryRequests', 'memoryLimits'],
          },
        }
        issues[type].paths.forEach((path) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: issues[type].message,
            path: [path],
          })
        })
      }
      if (checkResourceReversed(mutable(CpuResourceNames), data.cpuRequests, data.cpuLimits)) {
        addResourceIssue('cpu')
      }
      if (
        checkResourceReversed(mutable(MemoryResourceNames), data.memoryRequests, data.memoryLimits)
      ) {
        addResourceIssue('memory')
      }
    }),
}
