import ky from 'ky'

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_APP_API_BASE_URL,
  retry: {
    limit: 3,
    statusCodes: [403, 408, 413, 429, 500, 502, 503, 504],
    methods: ['get', 'post', 'put', 'delete'],
  },
})
