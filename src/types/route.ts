import { FileRouteTypes, routeTree } from '@/routeTree.gen'
import { type RouteIds } from '@tanstack/react-router'

export type RouteId = RouteIds<typeof routeTree>
export type RoutePath = Exclude<FileRouteTypes['fullPaths'], ''>
