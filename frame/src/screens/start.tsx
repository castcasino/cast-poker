

export default (_ctx: any) => {
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-fuchsia-50">
            <section>
                <span tw="text-fuchsia-600 text-5xl font-light tracking-wider italic">
                    Would you like to play a game?
                </span>
            </section>

            <img
                src="https://assets.cast.casino/poker-table.png"
                tw="mt-10 h-48 w-48"
            />
        </div>
    )
}
