import { Link } from '@tanstack/react-router'

export const GNB = () => {
  return (
    <div className="flex h-[60px] w-full shrink-0 items-center justify-between px-5">
      <Link className="flex h-10 items-center" to="/">
        <img alt="logo" className="h-4.5" src="/Logo.png" />
      </Link>
    </div>
  )
}
