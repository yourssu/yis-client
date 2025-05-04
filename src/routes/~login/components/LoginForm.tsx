import { useInputState } from 'react-simplikit'
import { tv } from 'tailwind-variants'

const form = tv({
  slots: {
    input:
      'border-grey200 focus:border-brandPrimary hover:border-brandDisabled ease-ease rounded-lg border px-4 py-2 transition-colors duration-200',
    button:
      'text-15 bg-brandPrimary hover:bg-brandHover focus:bg-brandHover disabled:bg-brandDisabled ease-ease mt-4 cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:text-[hsla(0,0%,100%,0.45)]',
  },
})

export const LoginForm = () => {
  const { input, button } = form()

  const [nickname, setNickname] = useInputState('')
  const [password, setPassword] = useInputState('')

  const isFormValid = nickname.length > 0 && password.length > 0

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      return
    }
  }

  return (
    <div className="bg-greyBackground w-[400px] rounded-2xl p-6">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex items-center gap-2">
          <input className={input()} onChange={setNickname} placeholder="닉네임" value={nickname} />
          <div className="text-neutralMuted font-medium">.urssu@gmail.com</div>
        </div>
        <input
          className={input()}
          onChange={setPassword}
          placeholder="비밀번호"
          type="password"
          value={password}
        />
        <button className={button()} disabled={!isFormValid} type="submit">
          로그인
        </button>
      </form>
    </div>
  )
}
