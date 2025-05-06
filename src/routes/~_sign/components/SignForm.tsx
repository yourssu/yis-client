import { clsx } from 'clsx'

import { TextInput } from '@/components/TextInput'

const Button = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        'text-15 bg-brandPrimary hover:bg-brandHover focus:bg-brandHover disabled:bg-brandDisabled ease-ease mt-4 cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:text-[hsla(0,0%,100%,0.45)]',
        className
      )}
      {...props}
    />
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
