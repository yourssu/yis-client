import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { RouteId, RoutePath, Search } from '@/types/route'
import { useMatches, useNavigate, useSearch } from '@tanstack/react-router'

interface UseSearchStateProps<
  TFrom extends RouteId,
  TDeserialized extends Record<string, unknown>,
> {
  deserialize?: (search: Search<TFrom>) => TDeserialized
  from: TFrom
  serialize?: (search: TDeserialized) => Search<TFrom>
}

const useRoutePathById = (pathId: RouteId) => {
  const matches = useMatches()
  const path = matches.find((match) => match.routeId === pathId)?.fullPath as RoutePath | undefined

  if (!path) {
    throw new Error(`해당 id가 라우트 트리에 없어요. '${pathId}'`)
  }
  return path
}

export const useSearchState = <
  TFrom extends RouteId,
  TDeserialized extends Record<string, unknown> = Search<TFrom>,
>({
  from,
  serialize = (v) => v,
  deserialize = (v) => v as TDeserialized,
}: UseSearchStateProps<TFrom, TDeserialized>) => {
  const search = useSearch({ from })
  const routePath = useRoutePathById(from)
  const navigate = useNavigate({ from: routePath })

  const [searchState, setSearchState] = useState<TDeserialized>(deserialize(search))

  const setSearchParamsWrapper: Dispatch<SetStateAction<TDeserialized>> = (nextInit) => {
    navigate({
      to: routePath,
      search: (prev) =>
        serialize(
          typeof nextInit === 'function' ? nextInit(deserialize(prev as Search<TFrom>)) : nextInit
        ),
    })
  }

  useEffect(() => {
    setSearchState(deserialize(search))
  }, [search, deserialize])

  return [searchState, setSearchParamsWrapper] as const
}

export type DispatchSetSearchAction<
  TFrom extends RouteId,
  TDeserialized extends Record<string, unknown> = Search<TFrom>,
> = Dispatch<SetStateAction<TDeserialized>>
