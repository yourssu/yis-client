export const PartNames = [
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

export type PartNames = (typeof PartNames)[number]
