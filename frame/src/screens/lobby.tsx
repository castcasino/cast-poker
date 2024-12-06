

export default (_ctx: any) => {
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-green-50">

            {/* Frame Header */}
            <section tw="absolute w-full h-[200px] top-0 px-10 py-7 flex justify-between bg-lime-100 border-b-8 border-amber-500">
                <div tw="flex flex-col">
                    <div tw="flex w-[500px] bg-red-100">
                        <div tw="flex justify-end w-1/2">
                            # of Players
                        </div>

                        <div tw="pl-4 flex w-1/2">
                            <span tw="font-extrabold text-5xl">
                                37
                            </span>
                        </div>
                    </div>

                    <div tw="flex w-[500px] bg-red-100">
                        <div tw="flex justify-end w-1/2">
                            # of Decks
                        </div>

                        <div tw="pl-4 flex w-1/2">
                            2
                        </div>
                    </div>

                    <span tw="text-4xl tracking-widest">
                        Max Players: none
                    </span>
                </div>

                <div tw="px-5 py-2 flex flex-col items-center rounded-lg border-2 border-lime-500 bg-lime-200">
                    <span tw="text-5xl font-medium text-lime-600">
                        Total Pot
                    </span>

                    <span tw="text-6xl font-bold text-lime-800">
                        $88
                        <sup tw="text-3xl">
                            .1337
                        </sup>
                    </span>
                </div>

            </section>

            <section tw="flex items-center">
                <img
                    src="https://assets.cast.casino/poker-table.png"
                    tw="h-20 w-20"
                />

                <span tw="pl-10 text-lime-600 text-5xl font-light tracking-wider italic">
                    BUY IN for just 42<sup tw="text-3xl">.888</sup> $DEGEN
                </span>
            </section>

            <section tw="mt-10 flex">
                <img
                    src="https://assets.cast.casino/cards_01/AS.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/AD.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/KH.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/KC.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/2D.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />
            </section>

            {/* Frame Footer */}
            <section tw="absolute w-full h-[200px] bottom-0 px-10 py-7 flex justify-between bg-sky-200 border-t-8 border-purple-500">
                <div tw="flex flex-col">
                    <span tw="flex items-center text-4xl tracking-widest">
                        Pot: 0.0001337 $DEGEN
                    </span>

                    <span tw="text-4xl tracking-widest">
                        Asset: $DEGEN
                    </span>

                    <span tw="text-4xl tracking-widest">
                        Network: Base
                    </span>
                </div>

                <div tw="px-5 flex flex-col items-center justify-center rounded-lg border-2 border-lime-500 bg-lime-200">
                    <span tw="my-2 text-4xl font-medium text-lime-600 tracking-widest">
                        Play Begins In
                    </span>

                    <span tw="my-2 text-5xl font-bold text-lime-800 tracking-wider">
                        ~ 11h:11m
                    </span>
                </div>
            </section>
        </div>
    )
}
