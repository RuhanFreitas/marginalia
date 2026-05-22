import List from '@/components/list/list'
import PageError from '@/components/pageError/pageError'
import Search from '@/components/search/search'
import { SearchProvider } from '@/context/SearchContext'
import { getErrorMessage } from '@/lib/api'
import { getAllMarginalias } from '@/lib/marginalia'
import { Marginalia } from '@/types/api/marginalia'

export default async function Page() {
    let marginalias: Marginalia[] = []

    try {
        marginalias = await getAllMarginalias()
    } catch (err: unknown) {
        return (
            <PageError
                message={getErrorMessage(
                    err,
                    'Could not load entries. Please try again later',
                )}
            />
        )
    }

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
