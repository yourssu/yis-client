import Cookies from 'js-cookie'

export enum CookieName {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export const getAuthTokens = (): AuthTokens | undefined => {
  const accessToken = Cookies.get(CookieName.AccessToken)
  const refreshToken = Cookies.get(CookieName.RefreshToken)

  if (!accessToken || !refreshToken) {
    return undefined
  }

  return {
    accessToken,
    refreshToken,
  }
}

export const setAuthTokens = ({ accessToken, refreshToken }: AuthTokens): void => {
  Cookies.set(CookieName.AccessToken, accessToken, {
    path: '/',
    domain: window.location.hostname,
  })
  Cookies.set(CookieName.RefreshToken, refreshToken, {
    path: '/',
    domain: window.location.hostname,
  })
}

export const removeAuthTokens = (): void => {
  Cookies.remove(CookieName.AccessToken, {
    path: '/',
    domain: window.location.hostname,
  })
  Cookies.remove(CookieName.RefreshToken, {
    path: '/',
    domain: window.location.hostname,
  })
}
