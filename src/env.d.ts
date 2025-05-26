interface ImportMetaEnv {
  readonly VITE_APP_API_BASE_URL: string
  readonly VITE_APP_PROD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
