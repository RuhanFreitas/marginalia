'use client'

import { CornerDownRightIcon } from 'lucide-react'
import ReplyBox from '../replyBox/replyBox'
import { useState } from 'react'

export type CommentBase = {
    id: number
    content: string
    parentId: number | null
    userId: number
    marginaliaId: number
    createdAt: string
    updatedAt: string

    user?: {
        id: number
        name: string
    }
}

export type CommentType = CommentBase & {
    replies?: CommentType[]
}

export default function Comment({ comment }: any) {
    const [showReply, setShowReply] = useState(false)

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-default font-medium">
                        {comment.user?.name}
                    </span>

                    <span className="text-xs text-default/60">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <p className="text-sm text-default/80">{comment.content}</p>

                <button
                    onClick={() => setShowReply(!showReply)}
                    className="text-xs flex items-center gap-2 pt-2 text-default/60 w-fit"
                >
                    <CornerDownRightIcon /> REPLY
                </button>

                {showReply && (
                    <ReplyBox
                        commentId={comment.id}
                        marginaliaId={comment.marginaliaId}
                        onCancel={() => setShowReply(false)}
                    />
                )}
            </div>

            {comment.replies?.length > 0 && (
                <div className="pl-14 border-l border-foreground/10 flex flex-col gap-4">
                    {comment.replies.map((reply: any) => (
                        <Comment key={reply.id} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    )
}
