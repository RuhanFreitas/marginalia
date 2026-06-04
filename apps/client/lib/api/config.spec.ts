import { afterEach, describe, expect, it, vi } from 'vitest'

describe('getApiBaseUrl', () => {
    afterEach(() => {
        vi.unstubAllEnvs()
    })

    it('returns the public API URL for browser code', async () => {
        vi.stubEnv('NEXT_PUBLIC_API_URL', '/api')

        const { getApiBaseUrl } = await import('./config')

        expect(getApiBaseUrl()).toBe('/api')
    })
})
