interface Props {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Seating({ value, onChange }: Props) {
    return (
        <section className="my-5 px-3 flex flex-col gap-4">
            <div className="w-full sm:w-2/5">
                <label htmlFor="asset" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Seating time
                </label>

                <div className="mt-2">
                    <select
                        id="asset"
                        name="asset"
                        value={value}
                        onChange={onChange}
                        className="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-2xl tracking-wider text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    >
                        <option value="900" disabled>15 Minutes</option>
                        <option value="1800" disabled>30 Minutes</option>
                        <option value="3600" disabled>60 Minutes</option>
                        <option value="5400" disabled>2 Hours</option>
                        <option value="10800" disabled>3 Hours</option>
                        <option value="21600" disabled>6 Hours</option>
                        <option value="43200">12 Hours</option>
                        <option value="86400">24 Hours</option>
                    </select>
                </div>
            </div>
        </section>
    )
}
