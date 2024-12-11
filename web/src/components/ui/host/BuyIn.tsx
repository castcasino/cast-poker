
export function BuyIn({ buyIn, handleBuyIn }: { buyIn: string, handleBuyIn: any }) {
    return (
        <section className="my-5 px-3 flex flex-col gap-4">
            <div className="w-full sm:w-2/5">
                <label htmlFor="buy-in" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Buy-in amount
                </label>

                <div className="mt-2">
                    <select
                        id="buy-in"
                        name="buy-in"
                        value={buyIn} onChange={handleBuyIn}
                        className="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-2xl tracking-wider text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    >
                        <option value="10000000000000000" disabled>0.01 (~$37.18)</option>
                        <option value="5000000000000000" disabled>0.005 (~$18.59)</option>
                        <option value="1000000000000000" disabled>0.001 (~$3.70)</option>
                        <option value="500000000000000" disabled>0.0005 (~$1.85)</option>
                        <option value="100000000000000">0.0001 (~$0.37)</option>
                        <option value="50000000000000">0.00005 (~$0.19)</option>
                        <option value="10000000000000">0.00001 (~$0.04)</option>
                    </select>
                </div>
            </div>
        </section>
    )
}
