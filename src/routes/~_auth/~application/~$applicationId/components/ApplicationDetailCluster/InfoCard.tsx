interface ContentSectionProps {
  label: string
  labelTooltipContent?: string
}

export const InfoCard = ({ label, children }: React.PropsWithChildren<ContentSectionProps>) => {
  return (
    <div className="bg-grey100 flex flex-col gap-1 rounded-lg px-6 py-5">
      <div className="text-neutralMuted text-sm">{label}</div>
      <div className="text-2xl font-semibold">{children}개</div>
    </div>
  )
}
