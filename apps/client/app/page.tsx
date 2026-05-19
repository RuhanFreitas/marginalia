import Card from '@/components/card/card'
import Search from '@/components/search/search'
import Image from 'next/image'

export default function Page() {
    return (
        <div>
            <Search />
            <Card order={false} />
            <Card order={true} />
        </div>
    )
}
