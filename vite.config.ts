import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { sentryVitePlugin } from '@sentry/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
    sentryVitePlugin({
      org: 'yourssu-web',
      project: 'yis-client',
      reactComponentAnnotation: { enabled: true },
    }),
  ],

  build: {
    sourcemap: true,
  },
})
