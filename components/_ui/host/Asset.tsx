interface Props {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Asset({ value, onChange }: Props) {
    return (
        <section class="my-5 px-3 flex flex-col gap-4">
            <div class="w-full sm:w-2/5">
                <label htmlFor="asset" class="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Buy-in asset
                </label>

                <div class="mt-2">
                    <select
                        id="asset"
                        name="asset"
                        value={value}
                        onChange={onChange}
                        class="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-2xl tracking-wider text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    >
                        <option value="degen">$DEGEN</option>
                        <option value="eth">$ETH</option>
                    </select>
                </div>
            </div>
        </section>
    )
}
