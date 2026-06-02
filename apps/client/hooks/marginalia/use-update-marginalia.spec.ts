import { renderHook, act } from '@testing-library/react'
import { useUpdateMarginalia } from './use-update-marginalia'
import * as marginaliaApi from '@/lib/marginalia/api'
import type { MarginaliaFormValues } from '@/types/forms/marginaliaForm'

vi.mock('@/lib/marginalia/api', () => ({
    updateMarginalia: vi.fn(),
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({ refresh: vi.fn() }),
}))

const validForm: MarginaliaFormValues = {
    title: 'Title',
    book: 'Book',
    author: 'Author',
    description: 'Description',
    cover: 'https://example.com/cover.jpg',
    contentEn: 'Content',
}

describe('useUpdateMarginalia', () => {
    beforeEach(() => {
        vi.mocked(marginaliaApi.updateMarginalia).mockReset()
    })

    it('does not call api when validation fails', async () => {
        const { result } = renderHook(() => useUpdateMarginalia(1))

        await act(async () => {
            await result.current.save({ ...validForm, title: '' })
        })

        expect(marginaliaApi.updateMarginalia).not.toHaveBeenCalled()
    })

    it('updates marginalia and calls onSuccess on success', async () => {
        vi.mocked(marginaliaApi.updateMarginalia).mockResolvedValue(
            {} as never,
        )
        const onSuccess = vi.fn()
        const { result } = renderHook(() =>
            useUpdateMarginalia(1, onSuccess),
        )

        await act(async () => {
            await result.current.save(validForm)
        })

        expect(marginaliaApi.updateMarginalia).toHaveBeenCalledWith(
            1,
            expect.objectContaining({ title: 'Title' }),
        )
        expect(onSuccess).toHaveBeenCalled()
    })
})
