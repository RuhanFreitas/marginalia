'use client'

import { FormError } from '@/components/ui'
import { useAuth } from '@/providers'
import { getErrorMessage } from '@/lib/api'
import { postComment } from '@/lib/comments'
import { validateComment } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CommentBox({ marginaliaId }: { marginaliaId: number }) {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { user } = useAuth()
    const router = useRouter()

    async function handleSubmit() {
        const validationError = validateComment(content)
        if (validationError) {
            setError(validationError)
            return
        }

        setError('')
        setLoading(true)

        try {
            await postComment({ content: content.trim(), marginaliaId })

            setContent('')
            router.refresh()
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to post comment'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex w-full gap-3 border-b border-default/10 pb-8">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-default/10 bg-default/5 font-display text-xs uppercase text-default/60">
                {user?.name?.[0]?.toUpperCase() ?? '?'}
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3">
                <textarea
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value)
                        if (error) setError('')
                    }}
                    className="min-h-[120px] w-full resize-none border border-default/10 p-4 font-display text-sm text-default outline-0"
                    placeholder="Share your thoughts..."
                />

                <FormError message={error} align="start" />

                <button
                    onClick={handleSubmit}
                    disabled={loading || !content.trim()}
                    className="px-6 py-2 text-xs bg-default text-default-foreground hover:text-default hover:bg-default-foreground border hover:border-default/10 w-fit"
                >
                    {loading ? 'POSTING...' : 'POST'}
                </button>
            </div>
        </div>
    )
}
