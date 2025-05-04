export const GrainyBackground = () => {
  return (
    <div
      className="pointer-events-none fixed -top-[210vh] left-1/2 isolate -z-[1] aspect-square h-[300vh] -translate-x-1/2 mix-blend-screen"
      style={{
        filter: 'contrast(200%) brightness(200%) invert(100%)',
        background: `radial-gradient(closest-side, #5e6148 0%, transparent 100%), url('/noise.svg')`,
      }}
    />
  )
}
