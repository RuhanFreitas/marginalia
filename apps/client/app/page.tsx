import Card from '@/components/card/card'
import List from '@/components/list/list'
import Search from '@/components/search/search'
import { SearchProvider } from '@/context/SearchContext'
import { getAllMarginalias } from '@/lib/marginalia'
import { Marginalia } from '@/types/api/marginalia'

export default async function Page() {
    const marginalias: Marginalia[] = await getAllMarginalias()

    if (!marginalias.length) {
        return (
            <div className="h-screen flex justify-center items-center font-display text-default/60">
                <p>No marginalias found...</p>
            </div>
        )
    }

    return (
        <SearchProvider marginalias={marginalias}>
            <Search />
            <List />
        </SearchProvider>
    )
}
