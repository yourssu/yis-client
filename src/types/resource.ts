export const CpuResourceNames = ['100m', '250m', '500m', '1', '1.5', '2'] as const
export type CpuResourceNames = (typeof CpuResourceNames)[number]

export const MemoryResourceNames = [
  '32Mi',
  '64Mi',
  '128Mi',
  '256Mi',
  '512Mi',
  '1Gi',
  '1.5Gi',
  '2Gi',
] as const
export type MemoryResourceNames = (typeof MemoryResourceNames)[number]
