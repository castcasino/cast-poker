export function Footer({ tableid }: { tableid: string }) {
    return (
        <footer className="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-rose-500">
            <section className="px-3 flex flex-col items-center justify-center border-2 border-lime-500 bg-lime-200">
                <small className="text-xs font-medium text-lime-800 tracking-widest">
                    {tableid}
                </small>

                <span className="text-xs sm:text-lg font-medium text-lime-600 tracking-widest">
                    Play Begins In
                </span>

                <span className="text-xs sm:text-2xl font-bold text-lime-800 tracking-wider">
                    ~ 11h:11m
                </span>
            </section>

            <div className="flex flex-row gap-1">
                <section className="px-3 flex flex-col items-center justify-center border-2 border-lime-500 bg-lime-200">
                    <span className="text-xs sm:text-lg font-medium text-lime-600 tracking-widest">
                        Buy In For Just
                    </span>

                    <span className="text-xs sm:text-5xl font-bold text-lime-800 tracking-wider">
                        $8.88
                    </span>
                </section>

                <section className="px-3 flex flex-col items-center justify-center border-2 border-lime-500 bg-lime-200">
                    <span className="text-xs sm:text-lg font-medium text-lime-600 tracking-widest">
                        Next Game
                    </span>

                    <span className="text-xs sm:text-sm font-bold text-lime-800 tracking-wider">
                        $DEGEN on Base
                    </span>
                </section>
            </div>
        </footer>
    )
}
