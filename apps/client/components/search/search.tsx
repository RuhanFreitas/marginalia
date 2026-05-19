import { SearchIcon } from 'lucide-react'

export default function Search() {
    return (
        <div>
            <div className="flex justify-between items-center mx-auto max-w-5xl py-4 px-8 sm:px-0">
                <div className="my-auto flex items-center gap-2">
                    <SearchIcon className="text-default/60" width={12} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-none focus:outline-none rounded-md text-default text-sm"
                    />
                </div>

                <span className="text-xs text-default/60">6 entries</span>
            </div>
        </div>
    )
}
