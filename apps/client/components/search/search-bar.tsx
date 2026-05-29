'use client'

import { useSearch } from '@/providers'
import { SearchIcon } from 'lucide-react'

export default function Search() {
    const { query, setQuery, filtered } = useSearch()

    return (
        <div>
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-0">
                <div className="my-auto flex items-center gap-2">
                    <SearchIcon className="text-default/60" width={12} />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Search by title, author, or book..."
                        className="border-none focus:outline-none rounded-md text-default text-sm"
                    />
                </div>

                <span className="text-xs text-default/60">
                    {filtered.length} entries
                </span>
            </div>
        </div>
    )
}
