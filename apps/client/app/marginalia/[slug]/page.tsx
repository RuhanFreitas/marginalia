import { Comment, CommentBox } from '@/components/comments'
import { EditMarginaliaButton } from '@/components/marginalia'
import { FormError, PageError } from '@/components/ui'
import { getComments } from '@/lib/comments/server'
import { getMarginalia } from '@/lib/marginalia/server'
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
        <div className="mx-auto h-full max-w-5xl px-6 md:px-0">
            <div className="flex items-center justify-between gap-4 py-8 md:py-12">
                <Link href="/">
                    <button className="flex cursor-pointer items-center gap-3 text-sm text-default/60 hover:text-default">
                        <ArrowLeftIcon width={18} />
                        All entries
                    </button>
                </Link>
                <EditMarginaliaButton marginalia={marginalia} />
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-10 md:gap-8">
                <aside className="md:col-span-3">
                    <div className="grid grid-cols-[minmax(0,11rem)_1fr] items-start gap-6 md:grid-cols-1 md:gap-8">
                        <div className="relative aspect-[3/4] w-full overflow-hidden md:aspect-auto md:h-64 md:w-44">
                            <Image
                                fill
                                sizes="(max-width: 768px) 176px, 176px"
                                className="object-cover grayscale"
                                src={cover}
                                alt="Cover"
                            />
                        </div>

                        <div className="flex min-w-0 flex-col">
                            <span className="pb-1 text-[10px] text-default/60">
                                BOOK
                            </span>
                            <span className="pb-4 font-display text-xs text-default">
                                {book}
                            </span>

                            <span className="pb-1 text-[10px] text-default/60">
                                AUTHOR
                            </span>
                            <span className="pb-4 font-display text-xs text-default">
                                {author}
                            </span>

                            <span className="pb-1 text-[10px] text-default/60">
                                WRITTEN
                            </span>
                            <span className="pb-4 font-display text-xs text-default">
                                {new Date(createdAt).toLocaleDateString(
                                    'en-US',
                                )}
                            </span>
                        </div>
                    </div>
                </aside>

                <article className="flex min-w-0 flex-col gap-6 md:col-span-7 md:gap-8">
                    <h1 className="font-display text-2xl font-medium text-default md:text-3xl">
                        {title}
                    </h1>

                    <h2 className="border-l pl-6 font-display italic text-default/60">
                        {description}
                    </h2>

                    <div
                        className="min-w-0 max-w-full break-words font-display leading-8 tracking-wide text-default [&_img]:h-auto [&_img]:max-w-full [&_pre]:overflow-x-auto"
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
                </article>
            </div>
        </div>
    )
}
