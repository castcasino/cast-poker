

export default (_ctx: any) => {
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-green-50">
            <section tw="flex items-center">
                <img
                    src="https://assets.cast.casino/poker-table.png"
                    tw="h-20 w-20"
                />

                <span tw="pl-10 text-lime-600 text-5xl font-light tracking-wider italic">
                    Would you like to play a game?
                </span>
            </section>

            <section tw="mt-10 flex">
                <img
                    src="https://assets.cast.casino/cards_01/AS.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/KS.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/QS.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/JS.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/TS.svg"
                    tw="mx-5 h-48 w-36 border-2 border-slate-700"
                />
            </section>
        </div>
    )
}
