'use client'

import { useSearch } from '@/context/SearchContext'
import { Marginalia } from '@/types/api/marginalia'
import Link from 'next/link'
import Card from '../card/card'

export default function List() {
    const { filtered } = useSearch()

    return (
        <div>
            {filtered.map((marginalia: Marginalia, index: number) => (
                <Link key={marginalia.id} href={`/marginalia/${marginalia.id}`}>
                    <Card
                        cover={marginalia.cover}
                        order={index + 1}
                        book={marginalia.book}
                        author={marginalia.author}
                        title={marginalia.title}
                        description={marginalia.description}
                        createdAt={marginalia.createdAt}
                    />
                </Link>
            ))}
        </div>
    )
}
