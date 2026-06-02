import type { ReactNode } from 'react'

type FieldLabelProps = {
    icon: ReactNode
    label: string
    hint?: string
}

export default function FieldLabel({ icon, label, hint }: FieldLabelProps) {
    return (
        <div className="flex flex-col gap-1 mb-2">
            <span className="flex items-center gap-2 text-default/60 tracking-widest text-xs font-medium">
                {icon}
                {label}
            </span>
            {hint && (
                <span className="text-default/40 text-xs tracking-wide">
                    {hint}
                </span>
            )}
        </div>
    )
}

export const marginaliaInputClassName =
    'w-full py-3 px-4 text-default font-display text-sm outline-0 border border-default/10 bg-background placeholder:text-default/40 focus:border-default/30'
