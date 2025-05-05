import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/styles/index.css'
import { AuthProvider } from '@/components/Providers/AuthProvider'
import { useAuth } from '@/components/Providers/AuthProvider/hook'
import { TanstackQueryProvider } from '@/components/Providers/TanstackQueryProvider'
import { ToastProvider } from '@/components/Toast/ToastProvider'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { routeTree } from './routeTree.gen'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const router = createRouter({
  routeTree,
})

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
        <ToastProvider duration={3000}>
          <App />
        </ToastProvider>
      </AuthProvider>
    </TanstackQueryProvider>
  </StrictMode>
)

window.addEventListener('vite:preloadError', () => {
  window.location.reload()
})
