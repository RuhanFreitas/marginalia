import 'server-only'

import { headers } from 'next/headers'

/** Reach API via nginx on the Compose network (`/api` → Nest). */
const DOCKER_NGINX_API_BASE = 'http://nginx/api'

/**
 * Absolute API base URL for Server Components / SSR fetch.
 * Node fetch cannot use relative URLs such as `/api`.
 */
export async function getServerApiBaseUrl(): Promise<string> {
    const h = await headers()
    const host = h.get('x-forwarded-host') ?? h.get('host')
    const proto =
        (h.get('x-forwarded-proto') ?? 'http').split(',')[0]?.trim() ?? 'http'
    const apiPrefix = process.env.NEXT_PUBLIC_API_URL ?? '/api'

    if (host && apiPrefix.startsWith('/')) {
        return `${proto}://${host}${apiPrefix}`.replace(/\/$/, '')
    }

    const internal = process.env['API_INTERNAL_URL']
    if (internal?.startsWith('http')) {
        return internal.replace(/\/$/, '')
    }

    return DOCKER_NGINX_API_BASE
}
