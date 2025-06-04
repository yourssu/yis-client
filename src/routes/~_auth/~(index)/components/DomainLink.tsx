import { MdLink } from 'react-icons/md'

import { InlineButton } from '@/components/InlineButton'

interface DomainLinkProps {
  domainName: string
  port: number
}

export const DomainLink = ({ domainName, port }: DomainLinkProps) => {
  return (
    <InlineButton className="hover:bg-greyOpacity100 focus-visible:bg-greyOpacity100 active:bg-greyOpacity100 -ml-1.5">
      <div className="text-neutralMuted flex items-center gap-1.5 text-xs">
        <MdLink className="size-4" />
        {domainName}:{port}
      </div>
    </InlineButton>
  )
}
