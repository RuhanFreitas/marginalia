'use client'

import { CornerDownRightIcon } from 'lucide-react'

export default function Reply() {
    return (
        <button className="flex items-center text-xs text-default/60 hover:text-default gap-2 font-medium">
            <CornerDownRightIcon width={14} />
            <span>REPLY</span>
        </button>
    )
}
