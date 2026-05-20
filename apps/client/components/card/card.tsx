import { CardProps } from '@/types/ui/CardProps'
import Image from 'next/image'

export default function Card({
    order,
    book,
    author,
    cover,
    title,
    createdAt,
}: CardProps) {
    return (
        <div className="group grid grid-cols-5 border-t border-foreground/10">
            <div
                className={`${order % 2 === 0 ? 'order-2' : ''}  overflow-hidden col-span-2`}
            >
                <Image
                    className="grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-500 w-full h-[380] object-cover"
                    src={cover}
                    width={200}
                    height={200}
                    alt="Picture"
                />
            </div>
            <div
                className={`${order % 2 === 0 ? 'order-1' : ''} min-w-0 col-span-3 gap-8 flex flex-col justify-center items-center px-12`}
            >
                <div className="flex flex-col gap-8">
                    <span className="font-display text-8xl font-bold text-default/10">
                        {String(order).padStart(2, '0')}
                    </span>
                    <h1 className="font-display text-3xl font-semibold text-default tracking-wide">
                        {title}
                    </h1>
                    <p className="font-display tracking-wide text-xs font-medium italic text-default/60">
                        There is something vertiginous about the idea that we
                        never chose to be here — that existence precedes any
                        possible consent to it.
                    </p>
                </div>
                <span className="border-t border-foreground/10 w-full"></span>
                <div className="flex justify-between w-full">
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
