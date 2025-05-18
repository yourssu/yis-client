import { CpuResourceValueNames, MemoryResourceNames } from '@/types/resource'

type ResourceType = 'CPU' | 'MEMORY'
type GetResourceValueNames<TType extends ResourceType> = TType extends 'CPU'
  ? CpuResourceValueNames
  : TType extends 'MEMORY'
    ? MemoryResourceNames
    : never

interface ResourceChipProps<TType extends ResourceType> {
  limit: GetResourceValueNames<TType>
  request: GetResourceValueNames<TType>
  type: TType
}

export const ResourceChip = <TType extends ResourceType>({
  limit,
  request,
  type,
}: ResourceChipProps<TType>) => {
  return (
    <div className="border-grey200 flex items-center overflow-hidden rounded-sm border text-xs">
      <div className="px-2 py-0.5">
        {request} · {limit}
      </div>
      <div className="bg-grey200 text-neutralMuted px-2 py-0.5 font-semibold">
        {type === 'CPU' ? 'CPU' : 'RAM'}
      </div>
    </div>
  )
}
