interface Props {
    value: string;
    onClick: (event: string) => void;
}

export function GameType({ value, onClick }: Props) {
console.log('GAME TYPE', value)
    return (
        <section className="my-5 px-3 flex flex-col gap-4">
            <fieldset>
                <legend className="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Game type
                </legend>

                <div className="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {/* <!--
        Checked: "border-transparent", Not Checked: "border-gray-300"
        Active: "ring-2 ring-lime-500"
    --> */}
                    <label onClick={() => onClick('headsup')} aria-label="Standard" aria-description="4–10 business days for $5.00" className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none border-gray-300 opacity-50">
                        <input type="radio" name="delivery-method" value="Standard" className="sr-only" />

                        <span className="flex flex-1">
                            <span className="flex flex-col">
                                <span className="block text-3xl font-medium text-gray-900">
                                    Heads Up
                                </span>

                                <span className="mt-1 flex items-center text-sm text-gray-500">
                                    Player vs Player
                                </span>

                                <span className="mt-6 text-sm font-medium text-gray-900">
                                    All hands will complete their showdown and payout near instantly
                                </span>
                            </span>
                        </span>

                        {/* <!-- Not Checked: "hidden" --> */}
                        <svg className="size-5 text-lime-600 hidden" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                clipRule="evenodd"
                            />
                        </svg>

                        {/* <!--
        Active: "border", Not Active: "border-2"
        Checked: "border-lime-500", Not Checked: "border-transparent"
        --> */}
                        <span className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent" aria-hidden="true"></span>
                    </label>

                    {/* <!--
        Checked: "border-transparent", Not Checked: "border-gray-300"
        Active: "ring-2 ring-lime-500"
    --> */}
                    <label onClick={() => onClick('table')} aria-label="Express" aria-description="2–5 business days for $16.00" className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none border-transparent ring-2 ring-lime-500">
                        <input type="radio" name="delivery-method" value="Express" className="sr-only" />

                        <span className="flex flex-1">
                            <span className="flex flex-col">
                                <span className="block text-3xl font-medium text-gray-900">
                                    Table
                                </span>

                                <span className="mt-1 flex items-center text-sm text-gray-500">
                                    Earn 5% on ALL player buy-ins
                                </span>

                                <span className="mt-6 text-sm font-medium text-gray-900">
                                    Hands can take up to 24 hours to showdown and payout
                                </span>
                            </span>
                        </span>
                        {/* <!-- Not Checked: "hidden" --> */}
                        <svg className="size-10 text-lime-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {/* <!--
        Active: "border", Not Active: "border-2"
        Checked: "border-lime-500", Not Checked: "border-transparent"
        --> */}
                        <span className="pointer-events-none absolute -inset-px rounded-lg border border-lime-500" aria-hidden="true"></span>
                    </label>
                </div>
            </fieldset>
        </section>
    )
}
