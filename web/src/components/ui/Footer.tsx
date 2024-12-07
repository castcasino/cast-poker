export function Footer({ tableid }: { tableid: string }) {
    return (
        <footer className="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-lime-50">
            {/* Game Status Window */}
            <section className="px-3 flex flex-col items-center justify-center border-r-2 border-amber-700 bg-amber-200">
                <span className="text-xs sm:text-lg font-medium text-amber-600 tracking-widest">
                    Play Begins In
                </span>

                <span className="text-xs sm:text-2xl font-bold text-amber-800 tracking-wider">
                    ~ 11h:11m
                </span>
            </section>

            <div className="py-2 flex flex-row gap-3">
                {/* Buy-in Button */}
                <button className="animate-pulse px-3 flex flex-col items-center justify-center border-2 border-lime-500 bg-lime-200 rounded-xl shadow hover:bg-lime-100">
                    <span className="text-xs sm:text-lg font-medium text-lime-700 tracking-wider">
                        Buy In For Just
                    </span>

                    <span className="text-sm sm:text-3xl font-bold text-lime-900 tracking-wider">
                        $8.88
                    </span>

                    <span className="text-xs font-bold text-lime-600 tracking-wider">
                        My Buy-ins: 0
                    </span>
                </button>

                {/* Next Game Button */}
                <button className="px-3 flex flex-col items-center justify-center border-2 border-r-0 border-amber-500 bg-amber-200 rounded-l-xl">
                    <span className="text-xs sm:text-xl font-medium text-amber-600 tracking-widest">
                        Next Game
                    </span>

                    <small className="text-xs font-medium text-amber-800 tracking-widest">
                        {tableid}
                    </small>

                    <span className="text-xs sm:text-sm font-bold text-amber-800 tracking-wider">
                        $DEGEN on Base
                    </span>
                </button>

            </div>
        </footer>
    )
}
