import { z } from 'zod'

export type PaginationParams = {
  limit?: number
  skip?: number
}

export const PaginatedResponseBaseSchema = z.object({
  current_limit: z.number(),
  current_skip: z.number(),
  total_count: z.number(),
  total_pages: z.number(),
})

export type PaginatedResponseBaseType = z.infer<typeof PaginatedResponseBaseSchema>

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(s: T) => {
  return PaginatedResponseBaseSchema.extend({
    data: z.array(s),
  })
}

export type PaginatedResponseType<T extends object> = PaginatedResponseBaseType & {
  data: T[]
}
