export const IS_DEV = process.env.NODE_ENV !== 'production'
export const STAGE = IS_DEV ? 'dev' : 'prod'
