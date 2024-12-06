export function Footer() {
    return (
        <footer className="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-rose-500">
            footer

            <section className="m-3 px-3 flex flex-col items-center justify-center rounded-lg border-2 border-lime-500 bg-lime-200">
                <span className="text-lg font-medium text-lime-600 tracking-widest">
                    Play Begins In
                </span>

                <span className="text-2xl font-bold text-lime-800 tracking-wider">
                    ~ 11h:11m
                </span>
            </section>
        </footer>
    )
}
