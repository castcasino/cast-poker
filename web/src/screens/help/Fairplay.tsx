'use client'

import { useEffect, useState } from 'react'

// import Image from 'next/image'
import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import { FullDeck } from '~/components/ui/FullDeck'

export default function Fairplay({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
console.log('CONTEXT', context)

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

                        <Link href={`/${tableid}/fairplay`} className="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            Fairplay
                        </Link>

                        <Link href={`/${tableid}/agent`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Agent
                        </Link>
                    </nav>
                </div>
            </section>

            <div className="bg-white px-6 py-8 lg:px-8">
                <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
                    <p className="text-base/7 font-semibold text-sky-600 tracking-widest uppercase">
                        100% Fairplay Guarantee
                    </p>

                    <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-widest text-slate-700 sm:text-5xl uppercase">
                        Fairplay
                    </h1>

                    <h3 className="mt-2 text-pretty text-base font-semibold tracking-tight text-slate-500 sm:text-2xl">
                        Provably Fair Report
                        <span className="block text-xl">Table # {tableid}</span>
                    </h3>

                    <p className="mt-6 text-xl/8">
                        {context?.user.displayName || 'Guest'}, what do you already know about Fairplay?

                        We all want to play at fair, trustworthy online gaming sites.
                    </p>

                    <div className="mt-10 max-w-2xl">
                        <p>
                            The Crypto gaming community has come up with its own way of proving that games are fair.
                            As you might expect, with this being specific to Crypto, it doesn’t require you to trust a third party, it makes games totally transparent, and it makes use of advanced cryptography to ensure game outcomes haven’t been tampered with.
                            Using the provably fair method, you can verify the results for yourself in real time.
                        </p>

                        {/* <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                            <li className="flex gap-x-3">
                                <svg className="mt-1 size-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                                </svg>
                                <span>
                                    <strong className="font-semibold text-gray-900">Data types.</strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                                </span>
                            </li>
                            <li className="flex gap-x-3">
                                <svg className="mt-1 size-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                                </svg>
                                <span><strong className="font-semibold text-gray-900">Loops.</strong> Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</span>
                            </li>
                            <li className="flex gap-x-3">
                                <svg className="mt-1 size-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                                </svg>
                                <span><strong className="font-semibold text-gray-900">Events.</strong> Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.</span>
                            </li>
                        </ul> */}

                        <p className="mt-8">
                            But what exactly is provably fair gaming? How does it work? Why does it make Crypto gaming so transparent? We’re going to explore all of that here.
                            As you’ll see, the ramifications of provably fair gaming are revolutionary.
                        </p>

                        <section className="mt-5 flex flex-col gap-2">
                            <h2 className="text-2xl font-medium text-slate-700 tracking-wider">
                                Fairplay Block Hashes
                            </h2>

                            <Link href="https://basescan.org/block/0x4ec179a76051ce8add89671ff7ced12e3da773f39d0e700c013941203ed3f7dd" target="_blank">
                                <pre className="block text-sm text-blue-500 truncate">
                                    0x4ec179a76051ce8add89671ff7ced12e3da773f39d0e700c013941203ed3f7dd
                                </pre>
                            </Link>

                            <Link href="https://basescan.org/block/0x78a8903613d155bb7d9d9fd74fff5e99c0d46031ea9985c1e3230e8e5bf0edd1" target="_blank">
                                <pre className="block text-sm text-blue-500 truncate">
                                    0x78a8903613d155bb7d9d9fd74fff5e99c0d46031ea9985c1e3230e8e5bf0edd1
                                </pre>
                            </Link>

                            <Link href="https://basescan.org/block/0x7bc240d924d4bdc79ff9b520cec8fc5fdb5e23d693fe8101ff16dcc6d9d8c460" target="_blank">
                                <pre className="block text-sm text-blue-500 truncate">
                                    0x7bc240d924d4bdc79ff9b520cec8fc5fdb5e23d693fe8101ff16dcc6d9d8c460
                                </pre>
                            </Link>

                            <Link href="https://basescan.org/block/0x9ea98dde5091bf3c50015639cf27c2550b9b41857d5391fdd8e39520631efef6" target="_blank">
                                <pre className="block text-sm text-blue-500 truncate">
                                    0x9ea98dde5091bf3c50015639cf27c2550b9b41857d5391fdd8e39520631efef6
                                </pre>
                            </Link>

                            <Link href="https://basescan.org/block/0x13bdbadaeb217c08069c2821f5183d2ada5e4fdb158133ecda0c338f04633f34" target="_blank">
                                <pre className="block text-sm text-blue-500 truncate">
                                    0x13bdbadaeb217c08069c2821f5183d2ada5e4fdb158133ecda0c338f04633f34
                                </pre>
                            </Link>
                        </section>

                        <h2 className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-gray-900">
                            Poker Hand verification is very simple!
                        </h2>

                        <p className="my-4">
                            Our decks are NEVER shuffled —
                            which makes verification a lot easier after each hand.
                            You can easily calculate the position of each card dealt to each player.
                            For more help, please check out our Fairplay Tool on Cast Casino.
                        </p>

                        <div className="my-4 rounded-md bg-yellow-50 p-4 border border-yellow-200">
                            <div className="flex">
                                <div className="shrink-0">
                                    <svg className="size-10 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path
                                            fillRule="evenodd"
                                            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>

                                <div className="ml-3">
                                    <h3 className="text-base font-bold text-yellow-800">
                                        You Should Know!
                                    </h3>

                                    <div className="mt-2 text-sm text-yellow-800 leading-5 sm:leading-6">
                                        <p>
                                            All of our card decks are indexed starting with <span className="font-bold">ZERO (0)</span> and not ONE (1).
                                            Please make note of this fact when calculating the dealt card selections during the verification process.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <FullDeck />

                        <figure className="mt-10 border-l border-indigo-600 pl-9">
                            <blockquote className="font-semibold text-gray-900">
                                <p>
                                    “You should never trust any online entity at face value.
                                    Luckily for casino players, there are third parties set up with the sole purpose of verifying the published payout figures through testing.”
                                </p>
                            </blockquote>

                            <figcaption className="mt-6 flex gap-x-4">
                                <img
                                    className="size-6 flex-none rounded-full bg-gray-50"
                                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />

                                <div className="text-sm/6">
                                    <strong className="font-semibold text-gray-900">
                                        Maria Hill
                                    </strong>

                                    – Marketing Manager
                                </div>
                            </figcaption>
                        </figure>

                        <p className="mt-10">
                            Much like Crypto itself, provably fair solutions work on the problem of trust.
                            You no longer need a middleman or third party to verify that a casino’s algorithm is fair.
                            Since you have intervened in the process of a game outcome by providing a seed which changes something, the casino is no longer fully in control.
                        </p>
                    </div>

                    <figure className="mt-16">
                        <img
                            className="aspect-video rounded-xl bg-gray-50 object-cover border border-indigo-600 shadow"
                            src="https://i.ibb.co/cXRjBc5/cGc.jpg" alt=""
                        />

                        <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
                            <svg className="mt-0.5 size-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            eCOGRA is an example of one such third party.
                            This organization tests many casino games and published reports on whether or not the claims of the software providers match up with the facts.
                        </figcaption>
                    </figure>

                    <div className="mt-16 max-w-2xl">
                        <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900">
                            We all want to play at fair, trustworthy online gaming sites.
                        </h2>

                        <p className="mt-6">
                            This comprehensive framework provides a detailed catalogue of problematic in-game conduct, aiming to empower game developers, publishers, and community managers to support player well-being and foster healthier gaming spaces.
                        </p>

                        <p className="mt-8">
                            Establishing clear and effective community guidelines is crucial for promoting fairplay gaming. These guidelines should outline expected behavior, consequences for toxic behavior, and mechanisms for reporting and addressing issues.
                        </p>

                        <p className="mt-8">
                            Raising player awareness about fairplay gaming values and expectations can help promote a positive and respectful gaming culture.
                        </p>
                    </div>
                </div>
            </div>

        </main>
    )
}
