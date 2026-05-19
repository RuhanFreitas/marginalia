import Toggle from '../toggle/toggle'

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-100 bg-background border-b border-foreground/10">
            <div className="mx-auto max-w-5xl py-6 flex justify-between items-center px-8 sm:px-0">
                <div className="flex gap-4 items-center">
                    <span className="font-display text-2xl font-semibold tracking-wide text-default">
                        Marginalia
                    </span>
                    <span className="text-default/60 hidden text-xs font-semibold tracking-widest sm:inline">
                        A READER'S NOTES
                    </span>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-default text-xs border border-default/10 px-4 py-2">
                        Log In
                    </button>
                    <button className="flex items-center gap-2 bg-foreground text-default-foreground text-xs px-4 py-2">
                        Sign Up
                    </button>

                    <span className="border-l border-default/10"></span>

                    <Toggle />
                </div>
            </div>
        </nav>
    )
}
