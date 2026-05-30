import { API_BASE_URL } from '@/lib/api/config'
import * as userApi from './api'
import { createUser } from '../../test/helpers'

describe('user api', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('updateAccount patches user profile', async () => {
        const updated = createUser({ name: 'Updated' })
        vi.mocked(fetch).mockResolvedValue(
            new Response(JSON.stringify(updated), { status: 200 }),
        )

        await expect(
            userApi.updateAccount({ name: 'Updated' }),
        ).resolves.toEqual(updated)

        expect(fetch).toHaveBeenCalledWith(
            `${API_BASE_URL}/user`,
            expect.objectContaining({
                method: 'PATCH',
                body: JSON.stringify({ name: 'Updated' }),
            }),
        )
    })
})
