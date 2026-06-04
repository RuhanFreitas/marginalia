import 'server-only'

/** Nest API on the Compose network (no `/api` prefix — routes are `/marginalia`, etc.). */
const DOCKER_API_BASE = 'http://backend:3001'

const DEFAULT_DEV_API = 'http://localhost:3001'

/**
 * Absolute API base URL for Server Components / SSR fetch.
 * Must not use the browser Host header — hairpin to the public IP fails inside Docker.
 */
export function getServerApiBaseUrl(): string {
    const internal = process.env['API_INTERNAL_URL']
    if (internal?.startsWith('http')) {
        return internal.replace(/\/$/, '')
    }

    if (process.env.NODE_ENV === 'production') {
        return DOCKER_API_BASE
    }

    return DEFAULT_DEV_API
}
