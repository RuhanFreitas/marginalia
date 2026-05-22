import Comment from '@/components/comment/comment'
import CommentBox from '@/components/commentBox/commentBox'
import FormError from '@/components/formError/formError'
import PageError from '@/components/pageError/pageError'
import { getComments } from '@/lib/comment'
import { getMarginalia } from '@/lib/marginalia'
import { getErrorMessage } from '@/lib/api'
import type { Comment as CommentData } from '@/types/api/comment'
import { Marginalia } from '@/types/api/marginalia'
import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    let marginalia: Marginalia

    try {
        marginalia = await getMarginalia(slug)
    } catch (err: unknown) {
        return (
            <PageError
                message={getErrorMessage(err, 'Entry not found')}
                backLabel="All entries"
            />
        )
    }

    let comments: CommentData[] = []
    let commentsError = ''

    try {
        comments = await getComments(slug)
    } catch (err: unknown) {
        commentsError = getErrorMessage(err, 'Failed to load comments')
    }

    const { cover, book, author, createdAt, title, description, contentEn } =
        marginalia

    return (
        <div className="max-w-5xl mx-auto h-full overflow-hidden">
            <div className="py-12">
                <Link href="/">
                    <button className="flex cursor-pointer hover:text-default items-center gap-3 text-sm text-default/60">
                        <ArrowLeftIcon width={18} />
                        All entries
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-10">
                <div className="col-span-3 flex flex-col gap-8">
                    <Image
                        className="grayscale w-44 h-64 object-cover"
                        src={cover}
                        width={150}
                        height={150}
                        alt="Cover"
                    />

                    <div className="flex flex-col">
                        <span className="text-[10px] text-default/60 pb-1">
                            BOOK
                        </span>
                        <span className="text-xs font-display text-default pb-4">
                            {book}
                        </span>

                        <span className="text-[10px] text-default/60 pb-1">
                            AUTHOR
                        </span>
                        <span className="text-xs font-display text-default pb-4">
                            {author}
                        </span>

                        <span className="text-[10px] text-default/60 pb-1">
                            WRITTEN
                        </span>
                        <span className="text-xs font-display text-default pb-4">
                            {new Date(createdAt).toLocaleDateString('en-US')}
                        </span>
                    </div>
                </div>

                <div className="col-span-7 flex flex-col gap-8">
                    <h1 className="text-3xl font-display text-default font-medium">
                        {title}
                    </h1>

                    <h2 className="pl-6 border-l font-display text-default/60 italic">
                        {description}
                    </h2>

                    <div
                        className="leading-8 text-default font-display tracking-wide"
                        dangerouslySetInnerHTML={{ __html: contentEn }}
                    />

                    <div className="flex flex-col gap-6 border-t border-default/10 pt-8">
                        <h2 className="tracking-wider font-display text-default">
                            Comments ({comments.length})
                        </h2>

                        <CommentBox marginaliaId={marginalia.id} />

                        <div className="flex flex-col gap-6 pb-12">
                            {commentsError ? (
                                <FormError
                                    message={commentsError}
                                    align="start"
                                />
                            ) : comments.length === 0 ? (
                                <p className="text-sm text-default/60">
                                    No comments yet.
                                </p>
                            ) : (
                                comments.map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        comment={comment}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
