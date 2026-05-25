'use client'

import FormError from '@/components/formError/formError'
import { getErrorMessage } from '@/lib/api'
import { replyComment } from '@/lib/comment'
import { validateComment } from '@/lib/validation'
import { useRouter } from 'next/navigation'
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
    const router = useRouter()

    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [open, setOpen] = useState(true)

    async function handleSubmit() {
        const validationError = validateComment(content)
        if (validationError) {
            setError(validationError)
            return
        }

        setError('')
        setLoading(true)

        try {
            const token = localStorage.getItem('token')

            if (!token) {
                throw new Error('Sign in to post a reply')
            }

            await replyComment(
                {
                    content: content.trim(),
                    marginaliaId,
                    parentId: commentId,
                },
                token,
            )

            setContent('')
            setOpen(false)
            onSuccess?.()
            router.refresh()
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to post reply'))
        } finally {
            setLoading(false)
        }
    }

    if (!open) return null

    return (
        <div className="mt-2 flex flex-col gap-3">
            <textarea
                value={content}
                onChange={(e) => {
                    setContent(e.target.value)
                    if (error) setError('')
                }}
                placeholder="Write a reply..."
                className="min-h-[80px] w-full resize-none border border-default/10 p-3 font-display text-sm text-default outline-0"
            />

            <FormError message={error} align="start" />

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !content.trim()}
                    className="bg-default px-4 py-2 text-xs text-default-foreground"
                >
                    {loading ? 'POSTING...' : 'POST'}
                </button>

                <button
                    type="button"
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
    )
}
