import { TextInput, TextInputProps } from '@/components/TextInput/TextInput'
import { clamp } from '@/utils/number'
import { Merge } from '@/utils/type'

type NumberInputProps = Merge<
  TextInputProps,
  { max?: number; min?: number; onChange?: (value?: number) => void; value?: number }
>

const integerParser = (value: string): '' | number =>
  value === '' ? '' : Number(value.replace(/((\.|,)*)/g, ''))

export const NumberInput = ({
  value,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  onChange,
  ...props
}: NumberInputProps) => {
  const stringifiedValue = value !== undefined ? clamp(value, min, max) : undefined

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = integerParser(e.target.value)
    if (parsedValue === '' || !isNaN(parsedValue)) {
      onChange?.(parsedValue === '' ? undefined : clamp(parsedValue, min, max))
    }
  }

  return (
    <TextInput {...props} inputMode="numeric" onChange={handleChange} value={stringifiedValue} />
  )
}
