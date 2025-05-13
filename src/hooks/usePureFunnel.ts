import { useMemo, useState } from 'react'

import { createUseFunnel } from '@use-funnel/core'

export const usePureFunnel = createUseFunnel(({ initialState }) => {
  const [history, setHistory] = useState(() => [initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  return useMemo(
    () => ({
      history,
      currentIndex,
      push(state) {
        setHistory((prev) => {
          const next = prev.slice(0, currentIndex + 1)
          return [...next, state]
        })
        setCurrentIndex((prev) => prev + 1)
      },
      replace(state) {
        setHistory((prev) => {
          const next = prev.slice(0, currentIndex)
          return [...next, state]
        })
      },
      go(delta) {
        setCurrentIndex((prev) => prev + delta)
      },
      cleanup() {},
    }),
    [history, currentIndex]
  )
})
