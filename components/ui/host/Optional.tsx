interface Props {
    value: string;
    onChange: (event: unknown) => void;
}

export function Optional({ value, onChange }: Props) {
    return (
        <section class="my-5 px-3 flex flex-col gap-4">
            <div class="w-full sm:w-2/3">
                <label htmlFor="table-name" class="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Table Name (optional)
                </label>

                <div class="mt-2">
                    <input
                        value={value}
                        onChange={onChange}
                        type="text"
                        id="table-name"
                        name="table-name"
                        class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="Saturday Night Hold-em"
                    />
                </div>
            </div>

            <div class="w-full sm:w-2/3">
                <label htmlFor="table-banner" class="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Table Banner (optional)
                </label>

                <div class="mt-2">
                    <input
                        type="text"
                        id="table-banner"
                        name="table-banner"
                        class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="https://location-of-banner-image"
                    />
                </div>
            </div>
        </section>
    )
}
