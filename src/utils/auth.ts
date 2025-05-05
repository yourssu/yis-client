import Cookies from 'js-cookie'

export enum CookieName {
  AccessToken = 'accessToken',
}

export type AuthTokens = {
  accessToken: string
}

export const getAuthTokens = (): AuthTokens | undefined => {
  const accessToken = Cookies.get(CookieName.AccessToken)

  if (!accessToken) {
    return undefined
  }

  return {
    accessToken,
  }
}

export const setAuthTokens = ({ accessToken }: AuthTokens): void => {
  Cookies.set(CookieName.AccessToken, accessToken, {
    path: '/',
    domain: window.location.hostname,
  })
}

export const removeAuthTokens = (): void => {
  Cookies.remove(CookieName.AccessToken, {
    path: '/',
    domain: window.location.hostname,
  })
}
