export default function Navbar() {
    return (
        <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1
                    className="text-2xl tracking-tight text-foreground"
                    style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontWeight: 700,
                    }}
                >
                    Marginalia
                </h1>
                <p
                    className="text-xs text-muted-foreground tracking-widest uppercase hidden sm:inline text-zinc-700"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '0.14em',
                    }}
                >
                    A READER'S NOTES
                </p>
            </div>
            <div>{/* auth buttons / user */}</div>
        </nav>
    )
}
