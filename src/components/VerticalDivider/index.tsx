import clsx from 'clsx'

export const VerticalDivider = ({ className }: { className?: string }) => {
  return <div className={clsx('bg-grey200 min-h-full w-[1px] self-stretch', className)} />
}
