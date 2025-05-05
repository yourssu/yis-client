import clsx from 'clsx'

export const Divider = ({ className }: { className?: string }) => {
  return <div className={clsx('bg-grey200 h-[1px] w-full', className)} />
}
