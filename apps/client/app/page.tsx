import Card from '@/components/card/card'
import Search from '@/components/search/search'
import { Marginalia } from '@/types/api/marginalia'

export default async function Page() {
    const data = await fetch('http://localhost:3001/marginalia/all')
    const posts = await data.json()

    return (
        <div>
            <Search />
            {posts.map((post: Marginalia, index: number) => (
                <Card
                    key={post.id}
                    cover={post.cover}
                    order={index + 1}
                    book={post.book}
                    author={post.author}
                    title={post.title}
                    createdAt={post.createdAt}
                />
            ))}
        </div>
    )
}
