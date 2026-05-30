import { renderHook, act } from '@testing-library/react'
import type { ReactNode } from 'react'

import { SearchProvider, useSearch } from './search-provider'
import { createMarginalia } from '../test/helpers'

const marginalias = [
    createMarginalia({
        id: 1,
        title: 'Dark Matter',
        author: 'Blake Crouch',
        book: 'Novel',
    }),
    createMarginalia({
        id: 2,
        title: 'The Hobbit',
        author: 'Tolkien',
        book: 'Fantasy',
    }),
]

function wrapper({ children }: { children: ReactNode }) {
    return (
        <SearchProvider marginalias={marginalias}>{children}</SearchProvider>
    )
}

describe('SearchProvider', () => {
    it('returns all items when query is empty', () => {
        const { result } = renderHook(() => useSearch(), { wrapper })

        expect(result.current.filtered).toHaveLength(2)
    })

    it('filters by title, author or book (case and accent insensitive)', () => {
        const { result } = renderHook(() => useSearch(), { wrapper })

        act(() => {
            result.current.setQuery('hobbit')
        })

        expect(result.current.filtered).toHaveLength(1)
        expect(result.current.filtered[0].title).toBe('The Hobbit')

        act(() => {
            result.current.setQuery('crouch')
        })

        expect(result.current.filtered[0].author).toBe('Blake Crouch')
    })

    it('throws when useSearch is used outside provider', () => {
        expect(() => renderHook(() => useSearch())).toThrow(
            'useSearch must be used within a SearchProvider',
        )
    })
})
