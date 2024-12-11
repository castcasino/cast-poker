export function Optional({ tableName, handleTableName }: { tableName: string, handleTableName: any }) {
    return (
        <section className="my-5 px-3 flex flex-col gap-4">
            <div className="w-full sm:w-2/3">
                <label htmlFor="table-name" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Table Name (optional)
                </label>

                <div className="mt-2">
                    <input
                        value={tableName}
                        onChange={handleTableName}
                        type="text"
                        id="table-name"
                        name="table-name"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="Saturday Night Hold-em"
                    />
                </div>
            </div>

            <div className="w-full sm:w-2/3">
                <label htmlFor="table-banner" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Table Banner (optional)
                </label>

                <div className="mt-2">
                    <input
                        type="text"
                        id="table-banner"
                        name="table-banner"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="https://location-of-banner-image"
                    />
                </div>
            </div>
        </section>
    )
}
