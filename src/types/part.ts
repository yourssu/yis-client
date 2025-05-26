// Todo: 백엔드 파트 조회 api로 대체해야 함
export const PartNames = [
  'HR',
  'IOS',
  'Android',
  'Frontend',
  'Backend',
  'Designer',
  'Marketer',
  'PM',
  'Legal',
] as const

export type PartNames = (typeof PartNames)[number]
