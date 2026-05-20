import Reply from '../reply/reply'

export default function Comment() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-default">Sophia</span>
                <span className="text-sm font-light text-default/60">
                    March 14, 2024
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-display text-default font-serif tracking-wider leading-5 text-sm">
                    This resonates deeply. The idea that thrownness is
                    liberating rather than constraining completely reframes
                    Heidegger for me. Thank you for this.
                </p>
                <Reply />
            </div>
        </div>
    )
}
