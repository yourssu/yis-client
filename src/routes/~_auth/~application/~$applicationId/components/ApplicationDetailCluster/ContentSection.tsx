interface ContentSectionProps {
  description?: string
  title: string
}

export const ContentSection = ({
  title,
  description,
  children,
}: React.PropsWithChildren<ContentSectionProps>) => {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-1.5">
        <div className="text-xl font-semibold">{title}</div>
        {description && <div className="text-neutralSubtle text-sm">{description}</div>}
      </div>
      {children}
    </div>
  )
}
