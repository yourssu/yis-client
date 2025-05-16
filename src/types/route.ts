import { FileRouteTypes, routeTree } from '@/routeTree.gen'
import { ExcludeEmptyObject, Prettify } from '@/utils/type'
import { RouteById, type RouteIds } from '@tanstack/react-router'

export type RouteId = RouteIds<typeof routeTree>
export type RoutePath = Exclude<FileRouteTypes['fullPaths'], ''>

export type Search<TFrom extends RouteId> = Prettify<
  ExcludeEmptyObject<RouteById<typeof routeTree, TFrom>['types']['fullSearchSchema']>
>
