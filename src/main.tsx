import { OverlayProvider } from 'overlay-kit'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/styles/index.css'
import { AuthProvider } from '@/components/Providers/AuthProvider'
import { useAuth } from '@/components/Providers/AuthProvider/hook'
import { TanstackQueryProvider } from '@/components/Providers/TanstackQueryProvider'
import { ToastProvider } from '@/components/Providers/ToastProvider'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  const auth = useAuth()
  return (
    <>
      <RouterProvider context={{ auth }} router={router} />
      <TanStackRouterDevtools router={router} />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <AuthProvider>
        <OverlayProvider>
          <ToastProvider duration={3000}>
            <App />
          </ToastProvider>
        </OverlayProvider>
      </AuthProvider>
    </TanstackQueryProvider>
  </StrictMode>
)

window.addEventListener('vite:preloadError', () => {
  window.location.reload()
})
