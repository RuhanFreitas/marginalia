import Image from 'next/image'

export default function Card({ order }: { order: boolean }) {
    return (
        <div className="group grid grid-cols-5 border-t border-foreground/10">
            <div
                className={`${order === true ? 'order-2' : ''}  overflow-hidden col-span-2`}
            >
                <Image
                    className="grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-500 w-full h-[380] object-cover"
                    src="/image.png"
                    width={200}
                    height={200}
                    alt="Picture"
                />
            </div>
            <div
                className={`${order === true ? 'order-1' : ''} min-w-0 col-span-3 gap-8 flex flex-col justify-center items-center px-12`}
            >
                <div className="flex flex-col gap-8">
                    <span className="font-display text-8xl font-bold text-default/10">
                        01
                    </span>
                    <h1 className="font-display text-3xl font-semibold text-default tracking-wide">
                        On the weight of being thrown
                    </h1>
                    <p className="font-display text-xs font-medium italic text-default/60">
                        There is something vertiginous about the idea that we
                        never chose to be here — that existence precedes any
                        possible consent to it.
                    </p>
                </div>
                <span className="border-t border-foreground/10 w-full"></span>
                <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                        <span className="text-xs text-default font-medium">
                            Being and Time
                        </span>
                        <span className="text-xs font-medium text-default/60">
                            Martin Heidegger
                        </span>
                    </div>
                    <span className="self-end text-xs font-medium text-default/60">
                        March 12, 2024
                    </span>
                </div>
            </div>
        </div>
    )
}
