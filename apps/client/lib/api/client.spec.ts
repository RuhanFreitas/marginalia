import {
    getErrorMessage,
    handleJsonResponse,
    parseApiError,
    parseApiErrorMessage,
} from './client'

describe('getErrorMessage', () => {
    it('returns Error message when available', () => {
        expect(getErrorMessage(new Error('boom'), 'fallback')).toBe('boom')
    })

    it('returns fallback for non-Error values', () => {
        expect(getErrorMessage('x', 'fallback')).toBe('fallback')
    })
})

describe('parseApiErrorMessage', () => {
    it('joins array messages', () => {
        expect(
            parseApiErrorMessage(
                { message: ['First', 'Second'] },
                'fallback',
            ),
        ).toBe('First. Second')
    })

    it('uses string message or fallback', () => {
        expect(parseApiErrorMessage({ message: 'Bad' }, 'fallback')).toBe('Bad')
        expect(parseApiErrorMessage({}, 'fallback')).toBe('fallback')
    })
})

describe('parseApiError', () => {
    it('parses JSON error body', async () => {
        const res = new Response(JSON.stringify({ message: 'Invalid' }), {
            status: 400,
        })

        await expect(parseApiError(res, 'fallback')).resolves.toBe('Invalid')
    })

    it('returns fallback when body is not JSON', async () => {
        const res = new Response('not json', { status: 500 })

        await expect(parseApiError(res, 'fallback')).resolves.toBe('fallback')
    })
})

describe('handleJsonResponse', () => {
    it('returns parsed JSON on success', async () => {
        const res = new Response(JSON.stringify({ ok: true }), { status: 200 })

        await expect(
            handleJsonResponse<{ ok: boolean }>(res, 'fallback'),
        ).resolves.toEqual({ ok: true })
    })

    it('throws parsed error message on failure', async () => {
        const res = new Response(JSON.stringify({ message: 'Nope' }), {
            status: 400,
        })

        await expect(handleJsonResponse(res, 'fallback')).rejects.toThrow('Nope')
    })

    it('dispatches auth-expired and throws on 401', async () => {
        const listener = vi.fn()
        window.addEventListener('auth-expired', listener)

        const res = new Response(null, { status: 401 })

        await expect(handleJsonResponse(res, 'fallback')).rejects.toThrow(
            'Session expired',
        )
        expect(listener).toHaveBeenCalled()

        window.removeEventListener('auth-expired', listener)
    })
})
