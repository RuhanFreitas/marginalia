import { API_BASE_URL } from '@/lib/api/config'
import * as commentsApi from './api'

describe('comments api', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('getComments fetches comment tree endpoint', async () => {
        const comments = [{ id: 1, content: 'Hi', replies: [] }]
        vi.mocked(fetch).mockResolvedValue(
            new Response(JSON.stringify(comments), { status: 200 }),
        )

        await expect(commentsApi.getComments('1')).resolves.toEqual(comments)
        expect(fetch).toHaveBeenCalledWith(
            `${API_BASE_URL}/comment/1/comments`,
            { credentials: 'include' },
        )
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
