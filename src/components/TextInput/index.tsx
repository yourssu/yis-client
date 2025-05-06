import clsx from 'clsx'

import { Label } from '@/components/Label'

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
  label?: string
}

export const TextInput = ({ className, invalid, label, ...props }: TextInputProps) => {
  const input = (
    <input
      className={clsx(
        'border-grey200 focus:border-brandPrimary hover:border-brandDisabled ease-ease w-full rounded-lg border px-4 py-2 transition-colors duration-200',
        invalid && '!border-negative',
        className
      )}
      {...props}
    />
  )

  if (label) {
    return <Label content={label}>{input}</Label>
  }

  return input
}
