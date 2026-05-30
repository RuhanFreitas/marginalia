import { API_BASE_URL } from '@/lib/api/config'
import * as authApi from './api'
import { createUser } from '../../test/helpers'

describe('auth api', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('getCurrentUser returns user on success', async () => {
        const user = createUser()
        vi.mocked(fetch).mockResolvedValue(
            new Response(JSON.stringify(user), { status: 200 }),
        )

        await expect(authApi.getCurrentUser()).resolves.toEqual(user)
        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/user`, {
            credentials: 'include',
        })
    })

    it('getCurrentUser returns null on error response', async () => {
        vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 401 }))

        await expect(authApi.getCurrentUser()).resolves.toBeNull()
    })

    it('login posts credentials and returns auth response', async () => {
        const payload = {
            token: 'jwt',
            user: createUser(),
        }
        vi.mocked(fetch).mockResolvedValue(
            new Response(JSON.stringify(payload), { status: 200 }),
        )

        await expect(
            authApi.login({ email: 'a@b.com', password: 'secret' }),
        ).resolves.toEqual(payload)

        expect(fetch).toHaveBeenCalledWith(
            `${API_BASE_URL}/auth/login`,
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ email: 'a@b.com', password: 'secret' }),
            }),
        )
    })

    it('logout throws when request fails', async () => {
        vi.mocked(fetch).mockResolvedValue(
            new Response(JSON.stringify({ message: 'Failed' }), { status: 500 }),
        )

        await expect(authApi.logout()).rejects.toThrow('Failed')
    })
})
