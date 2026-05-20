import Comment from '@/components/comment/comment'
import { getMarginalia } from '@/lib/marginalia'
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

    const marginalia: Marginalia = await getMarginalia(slug)

    const { cover, book, author, createdAt, title, description, contentEn } =
        marginalia

    return (
        <div className="max-w-5xl mx-auto h-full overflow-hidden">
            <div className="py-12">
                <Link href="/">
                    <button className="flex group transition cursor-pointer hover:text-default items-center gap-3 text-sm font-medium text-default/60">
                        <ArrowLeftIcon
                            className="text-default/60 group-hover:scale-105 group-hover:text-default"
                            width={18}
                        />
                        All entries
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-10">
                <div className="col-span-3 flex flex-col gap-8">
                    <div>
                        <Image
                            className="grayscale w-44 h-64 object-cover"
                            src={cover}
                            width={150}
                            height={150}
                            alt="Cover"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-default/60 tracking-widest">
                                BOOK
                            </span>
                            <span className="text-xs font-display text-default font-medium">
                                {book}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-default/60 tracking-widest">
                                AUTHOR
                            </span>
                            <span className="text-xs font-display text-default font-medium">
                                {author}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-default/60 tracking-widest">
                                WRITTEN
                            </span>
                            <span className="text-xs font-display text-default/60 font-medium">
                                {new Date(createdAt).toLocaleDateString(
                                    'en-US',
                                )}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 max-w-48 border-t border-foreground/10">
                            <span className="text-[10px] text-default/60 tracking-widest pt-4">
                                MARGINALIA
                            </span>
                            <span className="text-xs text-default/60 font-light tracking-wider">
                                These are not reviews. They are the residue of
                                reading — thoughts that attached themselves to
                                the pages.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-span-7 flex flex-col gap-8">
                    <h1 className="font-display text-3xl font-medium text-default tracking-wide">
                        {title}
                    </h1>
                    <h2 className="pl-6 border-l-2 border-foreground/10 font-display text-md leading-7 text-default/60 tracking-wide italic">
                        {description}
                    </h2>
                    <p className="font-display text-default tracking-wide leading-7">
                        {contentEn}
                    </p>
                    <div className="flex flex-col py-8 border-t border-default/10 gap-4">
                        <h2 className="font-display tracking-wider">
                            Comments (1)
                        </h2>
                        <div>
                            <Comment />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
