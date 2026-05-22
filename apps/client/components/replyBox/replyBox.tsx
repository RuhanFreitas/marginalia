'use client'

import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'

type ReplyBoxProps = {
    commentId: number
    marginaliaId: number
    onCancel?: () => void
    onSuccess?: () => void
}

export default function ReplyBox({
    commentId,
    marginaliaId,
    onCancel,
    onSuccess,
}: ReplyBoxProps) {
    const { user } = useAuth()

    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(true)

    async function handleSubmit() {
        if (!content.trim()) return

        setLoading(true)

        try {
            const token = localStorage.getItem('token')

            setContent('')
            setOpen(false)

            onSuccess?.()
        } finally {
            setLoading(false)
        }
    }

    if (!open) return null

    return (
        <div className="flex gap-4 mt-4 pb-2 border-foreground/10 pl-4">
            <div className="w-7 h-7 flex items-center justify-center border border-default/10 text-xs font-display text-default/60">
                {user?.name?.[0] ?? '?'}
            </div>

            <div className="flex flex-col gap-3 w-full">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full min-h-[80px] p-3 border border-default/10 text-sm resize-none outline-0"
                />

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !content.trim()}
                        className="px-4 py-2 text-xs bg-default text-default-foreground"
                    >
                        {loading ? 'POSTING...' : 'POST'}
                    </button>

                    <button
                        onClick={() => {
                            setOpen(false)
                            onCancel?.()
                        }}
                        className="text-xs text-default/60"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    )
}
