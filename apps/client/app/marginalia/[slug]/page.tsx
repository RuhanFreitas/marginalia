import Comment from '@/components/comment/comment'
import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
    return (
        <div className="max-w-5xl mx-auto h-full overflow-hidden">
            <div className="py-12">
                <button className="flex items-center gap-3 text-sm font-medium text-default/60">
                    <ArrowLeftIcon className="text-default/60" width={18} />
                    All entries
                </button>
            </div>
            <div className="grid grid-cols-10">
                <div className="col-span-3 flex flex-col gap-8">
                    <div>
                        <Image
                            className="grayscale w-44 h-64"
                            src={'/image.png'}
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
                                Being and Time
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-default/60 tracking-widest">
                                AUTHOR
                            </span>
                            <span className="text-xs font-display text-default font-medium">
                                Martin Heidegger
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-default/60 tracking-widest">
                                WRITTEN
                            </span>
                            <span className="text-xs font-display text-default/60 font-medium">
                                March 14, 2024
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
                        On the weight of being thrown
                    </h1>
                    <h2 className="pl-6 border-l-2 border-foreground/10 font-display text-md leading-7 text-default/60 tracking-wide italic">
                        There is something vertiginous about the idea that we
                        never chose to be here — that existence precedes any
                        possible consent to it.
                    </h2>
                    <p className="font-display text-default tracking-wide leading-7">
                        There is something vertiginous about the idea that we
                        never chose to be here — that existence precedes any
                        possible consent to it. Heidegger calls this
                        Geworfenheit, thrownness, and I find the word more
                        honest than most philosophical terms. We are thrown,
                        like objects, into a world already furnished with
                        meaning we did not author.
                        <br />
                        <br /> What strikes me is not the pessimism often read
                        into this. It is the opposite. If I was thrown without
                        my choosing, then whatever I do with the throw is
                        entirely mine. The arc after release belongs to me.
                        Heidegger calls this projection — Entwurf — and I think
                        the spatial metaphor is deliberate. We are always
                        already in motion. The question is whether we own the
                        trajectory. <br />
                        <br /> I read this on a Tuesday evening in February when
                        the light was leaving early and I felt, briefly, the
                        absurdity of sitting in a warm room while everything
                        outside continued without my permission. The book did
                        not comfort me. It just made the absurdity more precise,
                        which is sometimes the same thing.
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
