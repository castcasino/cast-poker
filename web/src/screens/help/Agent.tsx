'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export default function Agent({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    useEffect(() => {
        const load = async () => {
            setContext(await sdk.context)
            sdk.actions.ready()
        }

        if (sdk && !isSDKLoaded) {
            setIsSDKLoaded(true)
            load()
        }
    }, [ isSDKLoaded ])

    if (!isSDKLoaded) {
        return <div>Loading. Please wait...</div>
    }

    return (
        <main className="w-full">
            <section>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                        <Link href={`/${tableid}/faq`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            FAQ
                        </Link>

                        <Link href={`/${tableid}/fairplay`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Fairplay
                        </Link>

                        <Link href={`/${tableid}/agent`} className="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            Agent
                        </Link>
                    </nav>
                </div>
            </section>

            <p className="mx-3 my-5 p-5 text-lg tracking-wider text-slate-600 leading-7 bg-amber-100 rounded-xl border border-amber-300 shadow">
                {context?.user.displayName}, get the help that you need for table # {tableid}, when you need it!
            </p>

            <section className="px-3 py-5">
                <ul role="list" className="space-y-6">
                    <li className="relative flex gap-x-4">
                        <div className="absolute -bottom-6 left-0 top-0 flex w-6 justify-center">
                            <div className="w-px bg-gray-200"></div>
                        </div>
                        <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                            <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                        </div>
                        <p className="flex-auto py-0.5 text-xs/5 text-gray-500"><span className="font-medium text-gray-900">Chelsea Hagon</span> created the invoice.</p>
                        <time dateTime="2023-01-23T10:32" className="flex-none py-0.5 text-xs/5 text-gray-500">7d ago</time>
                    </li>
                    <li className="relative flex gap-x-4">
                        <div className="absolute -bottom-6 left-0 top-0 flex w-6 justify-center">
                            <div className="w-px bg-gray-200"></div>
                        </div>
                        <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                            <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                        </div>
                        <p className="flex-auto py-0.5 text-xs/5 text-gray-500"><span className="font-medium text-gray-900">Chelsea Hagon</span> edited the invoice.</p>
                        <time dateTime="2023-01-23T11:03" className="flex-none py-0.5 text-xs/5 text-gray-500">6d ago</time>
                    </li>
                    <li className="relative flex gap-x-4">
                        <div className="absolute -bottom-6 left-0 top-0 flex w-6 justify-center">
                            <div className="w-px bg-gray-200"></div>
                        </div>
                        <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                            <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                        </div>
                        <p className="flex-auto py-0.5 text-xs/5 text-gray-500"><span className="font-medium text-gray-900">Chelsea Hagon</span> sent the invoice.</p>
                        <time dateTime="2023-01-23T11:24" className="flex-none py-0.5 text-xs/5 text-gray-500">6d ago</time>
                    </li>
                    <li className="relative flex gap-x-4">
                        <div className="absolute -bottom-6 left-0 top-0 flex w-6 justify-center">
                            <div className="w-px bg-gray-200"></div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            className="relative mt-3 size-6 flex-none rounded-full bg-gray-50"
                        />
                        <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                            <div className="flex justify-between gap-x-4">
                                <div className="py-0.5 text-xs/5 text-gray-500"><span className="font-medium text-gray-900">Chelsea Hagon</span> commented</div>
                                <time dateTime="2023-01-23T15:56" className="flex-none py-0.5 text-xs/5 text-gray-500">3d ago</time>
                            </div>
                            <p className="text-sm/6 text-gray-500">Called client, they reassured me the invoice would be paid by the 25th.</p>
                        </div>
                    </li>
                    <li className="relative flex gap-x-4">
                        <div className="absolute -bottom-6 left-0 top-0 flex w-6 justify-center">
                            <div className="w-px bg-gray-200"></div>
                        </div>
                        <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                            <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                        </div>
                        <p className="flex-auto py-0.5 text-xs/5 text-gray-500"><span className="font-medium text-gray-900">Alex Curren</span> viewed the invoice.</p>
                        <time dateTime="2023-01-24T09:12" className="flex-none py-0.5 text-xs/5 text-gray-500">2d ago</time>
                    </li>
                    <li className="relative flex gap-x-4">
                        <div className="absolute left-0 top-0 flex h-6 w-6 justify-center">
                            <div className="w-px bg-gray-200"></div>
                        </div>
                        <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                            <svg className="size-6 text-indigo-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path
                                    fill-rule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <p className="flex-auto py-0.5 text-xs/5 text-gray-500"><span className="font-medium text-gray-900">Alex Curren</span> paid the invoice.</p>
                        <time dateTime="2023-01-24T09:20" className="flex-none py-0.5 text-xs/5 text-gray-500">1d ago</time>
                    </li>
                </ul>

                {/* <!-- New comment form --> */}
                <div className="mt-6 flex gap-x-3">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-6 flex-none rounded-full bg-gray-50" />

                    <form action="javascript://" className="relative flex-auto">
                        <div className="overflow-hidden rounded-lg pb-12 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <label htmlFor="comment" className="sr-only">Add your comment</label>
                            <textarea
                                rows={2}
                                name="comment"
                                id="comment"
                                className="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                placeholder="Add your comment..."
                            />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                            <div className="flex items-center space-x-5">
                                <div className="flex items-center">
                                    <button type="button" className="-m-2.5 flex size-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                        <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path
                                                fill-rule="evenodd"
                                                d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        <span className="sr-only">Attach a file</span>
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Comment
                            </button>
                        </div>
                    </form>
                </div>
            </section>

        </main>
    )
}
