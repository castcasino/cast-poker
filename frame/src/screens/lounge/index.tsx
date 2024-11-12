/* Import modules. */
// TBD

export default (_ctx: any) => {
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-green-50">
            <span tw="text-7xl font-bold tracking-widest">
                Player's Lounge
            </span>

            <p tw="px-10 text-center">
                Sit back and relax for a while.
                We've got your covered!
            </p>

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
