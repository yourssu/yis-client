import { STAGE } from '@/config'
import * as Sentry from '@sentry/react'

export const initSentry = () => {
  if (STAGE !== 'prod') {
    return
  }
  Sentry.init({
    dsn: import.meta.env.VITE_APP_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        blockAllMedia: false,
        maskAllText: false,
      }),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', new RegExp(`^${import.meta.env.VITE_APP_PROD_URL}`)],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}
