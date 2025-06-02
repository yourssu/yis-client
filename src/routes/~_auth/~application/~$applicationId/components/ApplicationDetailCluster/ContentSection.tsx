interface ContentSectionProps {
  title: string
}

export const ContentSection = ({
  title,
  children,
}: React.PropsWithChildren<ContentSectionProps>) => {
  return (
    <div>
      <div className="mb-2 text-xl font-semibold">{title}</div>
      {children}
    </div>
  )
}
