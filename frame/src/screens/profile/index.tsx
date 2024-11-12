/* Import modules. */
// TBD

export default (_ctx: any) => {
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-green-50">
            <span tw="text-7xl font-bold tracking-widest">
                Player Profile
            </span>

            <p tw="px-10 text-center">
                Let's review all of your excellent stats.
                Compare how you rank to the rest of the community.
            </p>

            <div tw="flex text-7xl text-sky-500 font-light italic">
                GM, {_ctx.message.requesterUserData?.displayName}!
            </div>

            <div tw="mt-6 flex text-slate-800 font-bold tracking-widest uppercase">
                Your FID is{' '}
                {_ctx.message.requesterFid}
            </div>

            <div tw="mt-3 flex text-4xl text-slate-500 font-medium">
                {_ctx.message.requesterFid < 20_000
                    ? `You're OG!`
                    : `Welcome to the Cast Poker!`
                }
            </div>

            <section>
                <button tw="px-10 py-3 bg-amber-200 border border-amber-400 rounded-2xl shadow">
                    <span tw="text-3xl text-amber-700 font-bold tracking-widest">
                        • Menu Item #1
                    </span>
                </button>

            </section>
        </div>
    )
}
