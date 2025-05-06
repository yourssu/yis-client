export const Label = ({ content, children }: React.PropsWithChildren<{ content: string }>) => {
  return (
    <div className="w-full">
      <div className="text-15 !text-neutralMuted py-1.5 font-medium">{content}</div>
      {children}
    </div>
  )
}
