import Card from '@/components/card/card'
import Search from '@/components/search/search'
import { getAllMarginalias } from '@/lib/marginalia'
import { Marginalia } from '@/types/api/marginalia'
import Link from 'next/link'

export default async function Page() {
    const marginalias: Marginalia[] = await getAllMarginalias()

    return (
        <div>
            <Search />
            {marginalias.map((marginalia: Marginalia, index: number) => (
                <Link key={marginalia.id} href={`/marginalia/${marginalia.id}`}>
                    <Card
                        cover={marginalia.cover}
                        order={index + 1}
                        book={marginalia.book}
                        author={marginalia.author}
                        title={marginalia.title}
                        createdAt={marginalia.createdAt}
                    />
                </Link>
            ))}
        </div>
    )
}
