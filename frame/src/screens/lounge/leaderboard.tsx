/* Import modules. */
// TBD

export default (_ctx: any) => {
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-green-50">
            <span tw="text-7xl font-bold tracking-widest">
                Leaderboard
            </span>

            <p tw="px-10 text-center">
                Let's see how you're ranking up against the other Players?
            </p>

            <section tw="flex flex-col">
                <button tw="my-2 px-10 py-3 flex justify-between items-center bg-amber-200 border border-amber-400 rounded-2xl shadow">
                    <span tw="pr-5 text-3xl text-amber-700 font-bold tracking-widest">
                        #1 Satoshi Nakamoto
                    </span>

                    <span tw="pl-5 text-3xl text-amber-700 font-bold tracking-widest">
                        Ξ1.337
                    </span>
                </button>

                <button tw="my-2 px-10 py-3 flex justify-between items-center bg-amber-200 border border-amber-400 rounded-2xl shadow">
                    <span tw="pr-5 text-3xl text-amber-700 font-bold tracking-widest">
                        #2 Hal Finney
                    </span>

                    <span tw="pl-5 text-3xl text-amber-700 font-bold tracking-widest">
                        Ξ0.888
                    </span>
                </button>

            </section>
        </div>
    )
}
