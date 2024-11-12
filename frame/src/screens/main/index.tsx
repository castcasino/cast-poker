/* Import modules. */
// TBD

export default (_ctx: any) => {
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-green-50">
            <span tw="text-7xl font-bold tracking-widest">
                Main Menu
            </span>

            <p tw="px-10 text-center">
                What would you like to do next?
            </p>

            <section tw="flex flex-col">
                <button tw="my-2 px-10 py-3 bg-amber-200 border border-amber-400 rounded-2xl shadow">
                    <span tw="text-3xl text-amber-700 font-bold tracking-widest">
                        • Join a Game
                    </span>
                </button>

                <button tw="my-2 px-10 py-3 bg-amber-200 border border-amber-400 rounded-2xl shadow">
                    <span tw="text-3xl text-amber-700 font-bold tracking-widest">
                        • Create a Game
                    </span>
                </button>

            </section>
        </div>
    )
}
