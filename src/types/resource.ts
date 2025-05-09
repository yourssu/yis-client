export const CpuResourceNames = [
  '0.1 CPU',
  '0.25 CPU',
  '0.5 CPU',
  '1 CPU',
  '1.5 CPU',
  '2 CPU',
] as const
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
