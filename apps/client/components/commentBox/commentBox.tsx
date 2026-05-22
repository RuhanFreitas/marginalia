'use client'

import FormError from '@/components/formError/formError'
import { useAuth } from '@/context/AuthContext'
import { getErrorMessage } from '@/lib/api'
import { postComment } from '@/lib/comment'
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
            const token = localStorage.getItem('token')

            if (!token) {
                throw new Error('Sign in to post a comment')
            }

            await postComment({ content: content.trim(), marginaliaId }, token)

            setContent('')
            router.refresh()
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to post comment'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-4 w-full border-b border-default/10 pb-8">
            <div className="w-8 h-8 flex font-display text-default items-center justify-center border border-default/10 text-xs">
                {user?.name?.[0] ?? '?'}
            </div>

            <div className="flex flex-col gap-3 w-full">
                <textarea
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value)
                        if (error) setError('')
                    }}
                    className="w-full min-h-[120px] p-4 border border-default/10 text-sm font-display text-default outline-0 resize-none"
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
