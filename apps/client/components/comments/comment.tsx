'use client'

import type { Comment } from '@/types/api/comment'
import { CornerDownRightIcon } from 'lucide-react'
import { useState } from 'react'
import ReplyBox from './reply-box'

type CommentProps = {
    comment: Comment
}

function formatCommentDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

function getInitial(name?: string) {
    return name?.[0]?.toUpperCase() ?? '?'
}

export default function Comment({ comment }: CommentProps) {
    const [showReply, setShowReply] = useState(false)

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-default/10 bg-default/5 font-display text-xs uppercase text-default/60">
                    {getInitial(comment.user?.name)}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-sm font-semibold text-default">
                            {comment.user?.name ?? 'Anonymous'}
                        </span>
                        <span className="text-xs text-default/60">
                            {formatCommentDate(comment.createdAt)}
                        </span>
                    </div>

                    <p className="font-display text-sm leading-relaxed text-default">
                        {comment.content}
                    </p>

                    <button
                        type="button"
                        onClick={() => setShowReply(!showReply)}
                        className="flex w-fit items-center gap-1.5 pt-1 text-xs tracking-wide text-default/60 transition hover:text-default"
                    >
                        <CornerDownRightIcon width={12} height={12} />
                        REPLY
                    </button>

                    {showReply && (
                        <ReplyBox
                            commentId={comment.id}
                            marginaliaId={comment.marginaliaId}
                            onCancel={() => setShowReply(false)}
                        />
                    )}
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 flex flex-col gap-6 border-l border-foreground/10 pl-4 sm:ml-11 sm:pl-5">
                    {comment.replies.map((reply) => (
                        <Comment key={reply.id} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    )
}
