

export default (_ctx: any) => {
console.log('LOBBY CONTEXT', _ctx)
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-green-50">

            {/* Frame Header */}
            <header tw="absolute w-full h-[250px] top-0 px-10 py-7 flex justify-between bg-lime-100 border-b-8 border-amber-500">
                <div tw="flex flex-col">
                    <div tw="flex w-[500px] bg-red-100">
                        <div tw="flex justify-end w-1/2">
                            # of Players
                        </div>

                        <div tw="pl-4 flex items-end w-1/2">
                            <span tw="font-extrabold text-5xl">
                                37
                            </span>

                            <span tw="font-normal text-xl uppercase">
                                of
                            </span>

                            <span tw="pl-1 font-extrabold text-2xl uppercase">
                                no limit
                            </span>
                        </div>
                    </div>

                    <div tw="flex w-[500px] bg-rose-100">
                        <div tw="flex justify-end w-1/2">
                            # of Decks
                        </div>

                        <div tw="pl-4 flex w-1/2">
                            <span tw="font-extrabold text-5xl">
                                2
                            </span>
                        </div>
                    </div>

                    <div tw="flex w-[500px] bg-purple-100">
                        <div tw="flex flex-col items-center">
                            Fairplay Game Hash

                            <span tw="font-extrabold text-2xl">
                                4a1be564087da82f...6dd4851c11c3ee91
                            </span>
                        </div>
                    </div>
                </div>

                <section tw="px-5 py-2 flex flex-col items-center rounded-lg border-2 border-lime-500 bg-lime-200">
                    <span tw="text-6xl font-medium text-lime-600">
                        Total Pot
                    </span>

                    <span tw="text-8xl font-bold text-lime-800">
                        $88
                        <sup tw="mt-2 flex flex-col items-end text-4xl">
                            .1337
                            <span tw="font-bold text-3xl text-lime-600 tracking-widest">
                                USD
                            </span>
                        </sup>
                    </span>
                </section>

            </header>

            <main tw="flex flex-col">
                <section tw="flex items-center">
                    <img
                        src="https://assets.cast.casino/poker-table.png"
                        tw="h-20 w-20"
                    />

                    <span tw="pl-10 flex items-end text-lime-600 text-5xl font-light tracking-wider italic">
                        BUY IN for just
                        <span tw="pl-3 pr-2 text-8xl text-rose-400">42<sup tw="text-4xl">.888</sup></span>
                        <span tw="-ml-20 text-rose-600">$DEGEN</span>
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
            </main>

            {/* Frame Footer */}
            <footer tw="absolute w-full h-[200px] bottom-0 px-10 py-7 flex justify-between bg-sky-200 border-t-8 border-purple-500">
                <div tw="flex flex-col">
                    <span tw="flex items-center text-2xl tracking-widest">
                        {_ctx?.message?.requesterUserData?.displayName} Stats
                        <span tw="text-4xl">
                            1,337.888 $DEGEN
                        </span>
                    </span>

                    <span tw="text-4xl tracking-widest">
                        My Buy-ins: 0
                    </span>

                    <span tw="text-4xl tracking-widest">
                        Network: Base
                    </span>
                </div>

                <section tw="px-5 flex flex-col items-center justify-center rounded-lg border-2 border-lime-500 bg-lime-200">
                    <span tw="my-2 text-4xl font-medium text-lime-600 tracking-widest">
                        Play Begins In
                    </span>

                    <span tw="my-2 text-5xl font-bold text-lime-800 tracking-wider">
                        ~ 11h:11m
                    </span>
                </section>
            </footer>
        </div>
    )
}
