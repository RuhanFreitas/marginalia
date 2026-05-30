import { API_BASE_URL } from '@/lib/api/config'
import * as marginaliaApi from './api'
import { createMarginalia } from '../../test/helpers'

describe('marginalia api', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('getAllMarginalias fetches list', async () => {
        const list = [createMarginalia()]
        vi.mocked(fetch).mockResolvedValue(
            new Response(JSON.stringify(list), { status: 200 }),
        )

        await expect(marginaliaApi.getAllMarginalias()).resolves.toEqual(list)
        expect(fetch).toHaveBeenCalledWith(
            `${API_BASE_URL}/marginalia/all`,
            { credentials: 'include' },
        )
    })

    it('createMarginalia posts body', async () => {
        const body = {
            title: 'T',
            book: 'B',
            author: 'A',
            description: 'D',
            cover: 'https://example.com/c.jpg',
            contentEn: 'C',
        }
        const created = createMarginalia(body)
        vi.mocked(fetch).mockResolvedValue(
            new Response(JSON.stringify(created), { status: 200 }),
        )

        await expect(marginaliaApi.createMarginalia(body)).resolves.toEqual(
            created,
        )
    })
})
