import { z } from 'zod'

export const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
})

export type TokenResponseType = z.infer<typeof TokenResponseSchema>
