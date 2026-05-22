'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Marginalia } from '@/types/api/marginalia'

type SearchContextType = {
    query: string
    setQuery: (value: string) => void
    filtered: Marginalia[]
}

type Props = {
    children: ReactNode
    marginalias: Marginalia[]
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

const normalize = (text: string) =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')

export function SearchProvider({ children, marginalias }: Props) {
    const [query, setQuery] = useState('')

    const filtered = marginalias.filter((item) =>
        normalize(item.title).includes(normalize(query)),
    )

    return (
        <SearchContext.Provider value={{ query, setQuery, filtered }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext)

    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider')
    }

    return context
}
