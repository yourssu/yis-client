import clsx from 'clsx'

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
    return (
      <div>
        <div className="text-15 !text-neutralMuted py-1.5 font-medium">{label}</div>
        {input}
      </div>
    )
  }

  return input
}
