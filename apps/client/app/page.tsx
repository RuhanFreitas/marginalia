import { HomeShell } from '@/components/layout'
import { MarginaliaList } from '@/components/marginalia'
import { PageError } from '@/components/ui'
import { SearchBar } from '@/components/search'
import { SearchProvider } from '@/providers'
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
            <HomeShell>
                <div className="h-screen flex justify-center items-center font-display text-default/60">
                    <p>No marginalias found...</p>
                </div>
            </HomeShell>
        )
    }

    return (
        <SearchProvider marginalias={marginalias}>
            <HomeShell>
                <SearchBar />
                <MarginaliaList />
            </HomeShell>
        </SearchProvider>
    )
}
