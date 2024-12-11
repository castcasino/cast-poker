
export function Asset({ asset, handleAsset }: { asset: string, handleAsset: any }) {
    return (
        <section className="my-5 px-3 flex flex-col gap-4">
            <div className="w-full sm:w-2/5">
                <label htmlFor="asset" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Buy-in asset
                </label>

                <div className="mt-2">
                    <select
                        id="asset"
                        name="asset"
                        value={asset} onChange={handleAsset}
                        className="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-2xl tracking-wider text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    >
                        <option value="degen" disabled>$DEGEN</option>
                        <option value="eth">$ETH</option>
                    </select>
                </div>
            </div>
        </section>
    )
}
