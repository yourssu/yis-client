export const partNames = [
  'HR',
  'iOS',
  'Android',
  'Frontend',
  'Backend',
  'Design',
  'Marketing',
  'Finance',
  'PM',
  'Legal',
] as const

export type PartName = (typeof partNames)[number]
