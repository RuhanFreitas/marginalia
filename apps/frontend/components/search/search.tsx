import { SearchIcon } from 'lucide-react'

export default function Search() {
    return (
        <div className="border-b border-foreground/20">
            <div className="flex justify-between items-center mx-auto max-w-5xl py-4 px-8">
                <div className="my-auto flex items-center gap-2">
                    <SearchIcon className="text-default/60 pt-1" width={14} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-none rounded-md text-default text-sm"
                    />
                </div>

                <span className="text-xs text-default/60">6 entries</span>
            </div>
        </div>
    )
}
