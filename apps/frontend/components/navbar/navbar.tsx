import Toggle from '../toggle/toggle'

export default function Navbar() {
    return (
        <nav className="border-b border-foreground/20">
            <div className="mx-auto max-w-5xl py-6 flex justify-between items-center px-8">
                <div className="flex gap-4 items-center">
                    <span className="font-display text-2xl font-semibold tracking-wide text-default">
                        Marginalia
                    </span>
                    <span className="text-default/60 hidden text-xs font-semibold tracking-widest sm:inline">
                        A READER'S NOTES
                    </span>
                </div>
                <div className="flex gap-4">
                    <button className="text-default text-sm">login</button>
                    <button className="text-default text-sm">sign up</button>
                    <Toggle />
                </div>
            </div>
        </nav>
    )
}
