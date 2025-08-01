import clsx from 'clsx'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { vars } from '@/styles/__generated__/color.gen'
import * as SelectPrimitive from '@radix-ui/react-select'

interface SelectProps<TValue extends string> {
  className?: string
  invalid?: boolean
  items: Readonly<TValue[]>
  onValueChange: (value: TValue) => void
  placeholder: string
  value: TValue | undefined
  viewPortBackground?: keyof typeof vars
}

export const Select = <TValue extends string>({
  items,
  onValueChange,
  value,
  className,
  viewPortBackground,
  invalid,
  placeholder,
}: React.PropsWithChildren<SelectProps<TValue>>) => {
  return (
    <SelectPrimitive.Root onValueChange={onValueChange} value={value}>
      <SelectPrimitive.Trigger asChild>
        <button
          className={clsx(
            'border-grey200 focus-visible:border-brandDisabled hover:border-brandDisabled ease-ease data-[placeholder]:text-neutralPlaceholder flex w-full cursor-pointer items-center justify-between rounded-lg border py-2 pl-4 transition-colors duration-200',
            invalid && '!border-negative',
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="text-neutralPlaceholder pr-2.5">
            <MdKeyboardArrowDown className="size-6" />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content position="popper" sideOffset={8}>
          <SelectPrimitive.Viewport
            className="bg-grey100 w-fit rounded-lg py-2"
            style={{
              backgroundColor: viewPortBackground && vars[viewPortBackground],
            }}
          >
            {items.map((item) => (
              <SelectPrimitive.Item
                className={clsx(
                  'text-15 data-highlighted:bg-grey200 mx-2 min-h-10 cursor-pointer rounded-lg p-2 font-medium',
                  item === value ? 'text-brandHover' : 'text-neutralMuted'
                )}
                key={item}
                value={item}
              >
                <SelectPrimitive.ItemText>{item}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
