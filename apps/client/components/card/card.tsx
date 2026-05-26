import { CardProps } from '@/types/ui/CardProps'
import Image from 'next/image'

export default function Card({
    order,
    book,
    author,
    cover,
    title,
    description,
    createdAt,
}: CardProps) {
    return (
        <div className="group grid grid-cols-1 border-t border-foreground/10 md:grid-cols-5 md:items-stretch">
            <div
                className={`relative h-[280px] overflow-hidden md:col-span-2 md:h-full md:min-h-[380px] ${order % 2 === 0 ? 'md:order-2' : ''}`}
            >
                <Image
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover grayscale transition duration-500 group-hover:scale-110 group-hover:grayscale-0"
                    src={cover}
                    alt="Picture"
                />
            </div>
            <div
                className={`flex min-w-0 w-full flex-col items-stretch justify-center gap-6 px-6 py-8 md:col-span-3 md:gap-8 md:px-12 md:py-12 ${order % 2 === 0 ? 'md:order-1' : ''}`}
            >
                <div className="flex w-full flex-col gap-6 md:gap-8">
                    <span className="font-display text-5xl font-bold text-default/10 md:text-8xl">
                        {String(order).padStart(2, '0')}
                    </span>
                    <h1 className="font-display text-xl font-semibold tracking-wide text-default md:text-3xl">
                        {title}
                    </h1>
                    <p className="font-display text-xs font-medium italic tracking-wide text-default/60">
                        {description}
                    </p>
                </div>
                <span className="w-full border-t border-foreground/10"></span>
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-default font-medium">
                            {book}
                        </span>
                        <span className="text-xs font-medium text-default/60">
                            {author}
                        </span>
                    </div>
                    <span className="self-end font-display text-xs font-light text-default/60">
                        {new Date(createdAt).toLocaleDateString('en-US')}
                    </span>
                </div>
            </div>
        </div>
    )
}
