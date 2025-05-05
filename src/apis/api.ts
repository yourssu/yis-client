import ky from 'ky'

import { getAuthTokens } from '@/utils/auth'

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_APP_API_BASE_URL,
  retry: {
    limit: 3,
    statusCodes: [403, 408, 413, 429, 500, 502, 503, 504],
    methods: ['get', 'post', 'put', 'delete'],
  },
  hooks: {
    beforeRequest: [
      (request, option) => {
        if (option.prefixUrl.endsWith('/')) {
          option.prefixUrl = option.prefixUrl.slice(0, -1)
        }

        const authTokens = getAuthTokens()
        if (authTokens) {
          request.headers.set('Authorization', `Bearer ${authTokens.accessToken}`)
        }
      },
    ],
  },
})
