import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/styles/index.css'
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
  return (
    <>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <ToastProvider duration={3000}>
        <App />
      </ToastProvider>
    </TanstackQueryProvider>
  </StrictMode>
)

window.addEventListener('vite:preloadError', () => {
  window.location.reload()
})
