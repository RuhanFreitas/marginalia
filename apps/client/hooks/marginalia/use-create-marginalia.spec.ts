import { renderHook, act, waitFor } from '@testing-library/react'

import { useCreateMarginalia } from './use-create-marginalia'
import * as marginaliaApi from '@/lib/marginalia/api'
import type { MarginaliaFormValues } from '@/types/forms/marginaliaForm'

vi.mock('@/lib/marginalia/api', () => ({
    createMarginalia: vi.fn(),
}))

const validForm: MarginaliaFormValues = {
    title: 'Title',
    book: 'Book',
    author: 'Author',
    description: 'Description',
    cover: 'https://example.com/cover.jpg',
    contentEn: 'Content',
}

describe('useCreateMarginalia', () => {
    beforeEach(() => {
        vi.mocked(marginaliaApi.createMarginalia).mockReset()
    })

    it('returns validation error without calling API', async () => {
        const { result } = renderHook(() => useCreateMarginalia())

        let success = true
        await act(async () => {
            success = await result.current.publish({
                ...validForm,
                title: '',
            })
        })

        expect(success).toBe(false)
        expect(result.current.error).toBe('Please, enter a valid title')
        expect(marginaliaApi.createMarginalia).not.toHaveBeenCalled()
    })

    it('publishes marginalia and calls onSuccess on success', async () => {
        vi.mocked(marginaliaApi.createMarginalia).mockResolvedValue(
            {} as never,
        )
        const onSuccess = vi.fn()

        const { result } = renderHook(() => useCreateMarginalia(onSuccess))

        let success = false
        await act(async () => {
            success = await result.current.publish(validForm)
        })

        expect(success).toBe(true)
        expect(marginaliaApi.createMarginalia).toHaveBeenCalled()
        expect(onSuccess).toHaveBeenCalled()
        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })
    })

    it('sets error message when API fails', async () => {
        vi.mocked(marginaliaApi.createMarginalia).mockRejectedValue(
            new Error('Server error'),
        )

        const { result } = renderHook(() => useCreateMarginalia())

        await act(async () => {
            await result.current.publish(validForm)
        })

        expect(result.current.error).toBe('Server error')
    })
})
