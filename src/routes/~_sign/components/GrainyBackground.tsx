import { vars } from '@/styles/__generated__/color.gen'

const grainyOptions = {
  filter: {
    contrast: 2,
    brightness: 2,
  },
  noise: {
    size: 5000,
  },
}

const noise = String.raw`
<svg viewBox='0 0 ${grainyOptions.noise.size} ${grainyOptions.noise.size}' xmlns='http://www.w3.org/2000/svg'>
  <filter id='noiseFilter'>
    <feTurbulence 
      type='fractalNoise' 
      baseFrequency='0.65' 
      numOctaves='3' 
      stitchTiles='stitch'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
</svg>
`

export const GrainyBackground = () => {
  const noiseBackground = `data:image/svg+xml;utf8,${encodeURIComponent(noise)}`

  return (
    <div
      className="pointer-events-none fixed -top-[210vh] left-1/2 isolate -z-[1] aspect-square h-[300vh] -translate-x-1/2 mix-blend-screen"
      style={{
        filter: `contrast(${grainyOptions.filter.contrast}) brightness(${grainyOptions.filter.brightness}) invert(1)`,
        background: `radial-gradient(closest-side, ${vars.noiseBackgroundInverted}, transparent), url("${noiseBackground}")`,
      }}
    />
  )
}
