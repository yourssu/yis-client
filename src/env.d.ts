interface ImportMetaEnv {
  readonly VITE_APP_API_BASE_URL: string
  readonly VITE_APP_PROD_URL: string
  readonly VITE_APP_SENTRY_AUTH_TOKEN: string
  readonly VITE_APP_SENTRY_DSN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
