import * as commentsApi from './api'

describe('comments api', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('postComment dispatches auth-expired on 401', async () => {
        const listener = vi.fn()
        window.addEventListener('auth-expired', listener)

        vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 401 }))

        await expect(
            commentsApi.postComment({ content: 'Hi', marginaliaId: 1 }),
        ).rejects.toThrow('Session expired')

        expect(listener).toHaveBeenCalled()
        window.removeEventListener('auth-expired', listener)
    })
})
