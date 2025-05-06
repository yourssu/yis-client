import clsx from 'clsx'

export const TextInput = ({
  className,
  invalid,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) => {
  return (
    <input
      className={clsx(
        'border-grey200 focus:border-brandPrimary hover:border-brandDisabled ease-ease w-full rounded-lg border px-4 py-2 transition-colors duration-200',
        invalid && '!border-negative',
        className
      )}
      {...props}
    />
  )
}
