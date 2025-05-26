export const regexes = {
  hostname: /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/,
  applicationName: /^[a-z][a-z0-9-]*$/,
} as const satisfies Record<string, RegExp>
