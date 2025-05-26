export const randomLowercaseAlphabet = () => {
  return String.fromCharCode(
    Math.floor(Math.random() * 26) + 97 // a-z
  )
}

export const randomMeaninglessString = (length: number) => {
  return Array.from({ length }, randomLowercaseAlphabet).join('')
}
