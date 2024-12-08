'use client'

import { useEffect, useState, useCallback } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import sdk, {
    FrameNotificationDetails,
    type FrameContext,
} from '@farcaster/frame-sdk'


import { Button } from '~/components/ui/Button'
import splashIcon from '~/../public/splash.png'

export default function MySuite({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    const [addFrameResult, setAddFrameResult] = useState("")
    const [notificationDetails, setNotificationDetails] =
        useState<FrameNotificationDetails | null>(null)
    const [sendNotificationResult, setSendNotificationResult] = useState("")

    const addFrame = useCallback(async () => {
        try {
            // setAddFrameResult("")
            setNotificationDetails(null)

            const result = await sdk.actions.addFrame()

            if (result.added) {
                if (result.notificationDetails) {
                    setNotificationDetails(result.notificationDetails)
                }

                setAddFrameResult(
                    result.notificationDetails
                    ? `Added, got notificaton token ${result.notificationDetails.token} and url ${result.notificationDetails.url}`
                    : 'Added, got no notification details'
                )
            } else {
                setAddFrameResult(`Not added: ${result.reason}`)
            }
        } catch (error) {
            setAddFrameResult(`Error: ${error}`)
        }
    }, [])

    const sendNotification = useCallback(async () => {
        setSendNotificationResult('')

        if (!notificationDetails) {
            return
        }

        try {
            const response = await fetch('/api/send-notification', {
                method: 'POST',
                mode: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: notificationDetails.token,
                    url: notificationDetails.url,
                    targetUrl: window.location.href,
                }),
            })

            if (response.status === 200) {
                setSendNotificationResult('Success')
                return
            }

            const data = await response.text()
            setSendNotificationResult(`Error: ${data}`)
        } catch (error) {
            setSendNotificationResult(`Error: ${error}`)
        }
    }, [ notificationDetails ])

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
                        <Link href={`/${tableid}/mysuite`} className="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            My Suite
                        </Link>

                        <Link href={`/${tableid}/leaderboard`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Leaderboard
                        </Link>

                        <Link href={`/${tableid}/events`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Events
                        </Link>
                    </nav>
                </div>
            </section>

            <section className="p-3">
                <div>

                </div>
                {(context && <Link href={`/${tableid}/mysuite`} className="group block shrink-0">
                    <div className="flex items-center">
                        <Image
                            className="inline-block size-12 rounded-full"
                            src={'https://wsrv.nl/?url=' + context?.user?.pfpUrl || splashIcon}
                            alt={context?.user?.displayName || ''}
                        />

                        <div className="ml-2">
                            <p className="text-lg font-medium text-lime-600 tracking-wider group-hover:text-lime-500">
                                {context.user.displayName}
                            </p>

                            <p className="text-sm font-medium text-lime-800 tracking-wider group-hover:text-lime-600">
                                {context.user.username}
                            </p>
                        </div>
                    </div>
                </Link>)}

                {(!context && <Link href={`/${tableid}/mysuite`} className="group block shrink-0">
                    <div className="flex items-center">
                        <Image
                            className="inline-block size-12"
                            src={splashIcon}
                            alt=""
                        />

                        <div className="ml-2">
                            <p className="text-lg font-medium text-lime-600 tracking-wider group-hover:text-lime-500">
                                Guest User
                            </p>

                            <p className="text-sm font-medium text-lime-800 tracking-wider group-hover:text-lime-600">
                                @guest_user
                            </p>
                        </div>
                    </div>
                </Link>)}

                <div>
                    <Button onClick={addFrame}>
                        Add Cast Poker to Warpcast
                    </Button>

                    {addFrameResult && (
                        <div className="mb-2 text-slate-700 text-xs text-center">
                            Add frame result:
                            {addFrameResult}
                        </div>
                    )}
                </div>

                {notificationDetails && (
                    <div>
                        <h2 className="font-2xl font-bold">Notify</h2>

                        {sendNotificationResult && (
                            <div className="mb-2">
                                Send notification result: {sendNotificationResult}
                            </div>
                        )}

                        <div className="mb-4">
                            <Button onClick={sendNotification}>Send notification</Button>
                        </div>
                    </div>
                )}

            </section>

            <form className="px-3">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">

                        <p className="mt-1 text-sm/6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>

                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                                            cast.poker/
                                        </div>

                                        <input
                                            type="text"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                            placeholder={context?.user.username || 'guest_user'}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                    Nickname
                                </label>

                                <div className="mt-2">
                                    <input
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        placeholder={context?.user.displayName || 'Guest User'}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                    Farcaster ID
                                </label>

                                <div className="mt-2">
                                    <input
                                        type="text"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        placeholder={context?.user.fid.toString() || 'n/a'}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                                    Player Bio
                                </label>

                                <div className="mt-2">
                                    <textarea
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    ></textarea>
                                </div>

                                <p className="mt-3 text-sm/6 text-gray-600">
                                    Write a few sentences about yourself.
                                </p>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">Cover photo</label>

                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path
                                                fillRule="evenodd"
                                                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <div className="mt-4 flex text-sm/6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            Notifications
                        </h2>

                        <p className="mt-1 text-sm/6 text-gray-600">
                            We&rsquo;ll always let you know about important changes, but you pick what else you want to hear about.
                        </p>

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm/6 font-semibold text-gray-900">
                                    By email
                                </legend>

                                <div className="mt-6 space-y-6">9
                                    <div className="flex gap-3">
                                        <div className="flex h-6 shrink-0 items-center">
                                            <div className="group grid size-4 grid-cols-1">
                                                <input
                                                    id="comments"
                                                    aria-describedby="comments-description"
                                                    name="comments"
                                                    type="checkbox"
                                                    checked
                                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                />

                                                <svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                                    <path className="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path className="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="text-sm/6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">Comments</label>
                                            <p id="comments-description" className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex h-6 shrink-0 items-center">
                                            <div className="group grid size-4 grid-cols-1">
                                                <input
                                                    id="candidates"
                                                    aria-describedby="candidates-description"
                                                    name="candidates"
                                                    type="checkbox"
                                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                />

                                                <svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                                    <path className="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path className="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="text-sm/6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">Candidates</label>
                                            <p id="candidates-description" className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex h-6 shrink-0 items-center">
                                            <div className="group grid size-4 grid-cols-1">
                                                <input
                                                    id="offers"
                                                    aria-describedby="offers-description"
                                                    name="offers"
                                                    type="checkbox"
                                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                />

                                                <svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                                    <path className="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path className="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="text-sm/6">
                                            <label htmlFor="offers" className="font-medium text-gray-900">Offers</label>
                                            <p id="offers-description" className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="text-sm/6 font-semibold text-gray-900">
                                    Push notifications
                                </legend>

                                <p className="mt-1 text-sm/6 text-gray-600">
                                    These are delivered via SMS to your mobile phone.
                                </p>

                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            checked
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />

                                        <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
                                            Everything
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />
                                        <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                                            Same as email
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />

                                        <label htmlFor="push-nothing" className="block text-sm/6 font-medium text-gray-900">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>

        </main>
    )
}
