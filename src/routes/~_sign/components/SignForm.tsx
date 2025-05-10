import clsx from 'clsx'

import { Button as StyledButton } from '@/components/Button'
import { TextInput } from '@/components/TextInput/TextInput'

const Button = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton
      className={clsx('mt-4 rounded-lg', className)}
      size="md"
      variant="primary"
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export const SignForm = ({
  children,
  onSubmit,
}: React.PropsWithChildren<{ onSubmit: React.FormEventHandler<HTMLFormElement> }>) => {
  return (
    <div className="bg-greyBackground w-[400px] rounded-2xl p-6">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  )
}

SignForm.Input = TextInput
SignForm.Button = Button
