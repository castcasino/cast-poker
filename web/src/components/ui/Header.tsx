export function Header({ tableid }) {
    return (
        <header className="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-sky-500">
            <div className="">
                <span>
                    {tableid}
                </span>

                <div>

                </div>
            </div>

            <section className="m-3 px-5 py-2 flex flex-col items-center rounded-lg border-2 border-lime-500 bg-lime-200">
                <span className="text-2xl font-medium text-lime-600">
                    Total Pot
                </span>

                <span className="-mt-2 flex flex-row text-4xl font-bold text-lime-800">
                    $88
                    <sup className="mt-2 flex flex-col items-end text-sm">
                        .1337
                        <span className="-mt-1 font-bold text-xs text-lime-600 tracking-widest">
                            USD
                        </span>
                    </sup>
                </span>
            </section>

        </header>
    )
}
