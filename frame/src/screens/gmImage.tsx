

export default (_ctx) => {
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-rose-100">
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
        </div>
    )
}
