import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

type PageErrorProps = {
    message: string
    backHref?: string
    backLabel?: string
}

export default function PageError({
    message,
    backHref = '/',
    backLabel = 'Back to home',
}: PageErrorProps) {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-6 font-display text-default/60">
            <p className="text-sm text-center max-w-md">{message}</p>
            <Link
                href={backHref}
                className="flex items-center gap-2 text-xs text-default/60 hover:text-default"
            >
                <ArrowLeftIcon width={14} />
                {backLabel}
            </Link>
        </div>
    )
}
