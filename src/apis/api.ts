import ky from 'ky'

import { signout } from '@/apis/auth'
import { TokenResponseType } from '@/types/auth'
import { getAuthTokens, setAuthTokens } from '@/utils/auth'
import { isKyHTTPError, makeFormData } from '@/utils/ky'

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
    afterResponse: [
      async (_1, _2, response) => {
        const throwToSigninPage = () => {
          signout()
          window.location.href = '/signin'
        }

        if (response.status === 401) {
          const authTokens = getAuthTokens()
          if (!authTokens) {
            throwToSigninPage()
            return
          }

          if (authTokens) {
            try {
              const { access_token: newAccessToken } = await ky
                .post<TokenResponseType>('auth/refresh', {
                  prefixUrl: import.meta.env.VITE_APP_API_BASE_URL,
                  body: makeFormData({
                    refresh_token: authTokens.refreshToken,
                  }),
                })
                .json()
              setAuthTokens({
                accessToken: newAccessToken,
                refreshToken: authTokens.refreshToken,
              })
            } catch (e: unknown) {
              if (!isKyHTTPError(e) || e.response.status !== 401) {
                return
              }
              throwToSigninPage()
            }
          }
        }
      },
    ],
  },
})
