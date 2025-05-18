import clsx from 'clsx'

import { InlineButton } from '@/components/InlineButton'
import { Link, LinkComponentProps } from '@tanstack/react-router'

export const InlineLink = ({ className, ...props }: LinkComponentProps) => {
  return (
    <InlineButton asChild>
      <Link className={clsx('text-blue500 underline', className)} {...props} />
    </InlineButton>
  )
}
