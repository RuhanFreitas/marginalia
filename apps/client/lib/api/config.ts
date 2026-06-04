const DEFAULT_DEV_API = 'http://localhost:3001'

function readPublicApiUrl(): string {
    return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_DEV_API
}

/** Public API base for the browser (relative `/api` is valid on the same origin). */
export const API_BASE_URL = readPublicApiUrl()

/** Sync base URL — browser / client components only. */
export function getApiBaseUrl(): string {
    return readPublicApiUrl()
}
