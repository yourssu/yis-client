import clsx from 'clsx'

import { Label } from '@/components/Label'

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  description?: string
  invalid?: boolean
  label?: string
}

export const TextInput = ({ className, description, invalid, label, ...props }: TextInputProps) => {
  const input = (
    <div className="flex flex-col gap-1.5">
      <input
        className={clsx(
          'border-grey200 focus:border-brandPrimary hover:border-brandDisabled ease-ease w-full rounded-lg border px-4 py-2 transition-colors duration-200',
          invalid && '!border-negative',
          className
        )}
        {...props}
      />
      <div className="text-neutralSubtle text-13 font-medium">{description}</div>
    </div>
  )

  if (label) {
    return <Label content={label}>{input}</Label>
  }

  return input
}
