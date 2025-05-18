'use client'

import { useEffect, useState, useCallback } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { signIn, signOut, getCsrfToken } from 'next-auth/react'

import sdk, {
    FrameNotificationDetails,
    type FrameContext,
} from '@farcaster/frame-sdk'

import {
    useAccount,
    // useSendTransaction,
    // useWaitForTransactionReceipt,
    useSwitchChain,
    useChainId,
} from 'wagmi'
import { base, degen } from 'wagmi/chains'
import { BaseError, UserRejectedRequestError } from 'viem'

import { useSession } from "next-auth/react"
import { SignInResult } from '@farcaster/frame-core/dist/actions/signIn'

import { Button } from '../../components/ui/Button'
import splashIcon from '../../../public/splash.png'

import { truncateAddress } from '../../lib/truncateAddress'

const renderError = (error: Error | null) => {
    if (!error) return null

    if (error instanceof BaseError) {
        const isUserRejection = error.walk((e) => e instanceof UserRejectedRequestError)

        if (isUserRejection) {
            return <div class="text-red-500 text-xs mt-1">Rejected by user.</div>
        }
    }

    return <div class="text-red-500 text-xs mt-1">{error.message}</div>
}

export default function MySuite({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    const [addFrameResult, setAddFrameResult] = useState('')
    const [notificationDetails, setNotificationDetails] =
        useState<FrameNotificationDetails | null>(null)
    const [sendNotificationResult, setSendNotificationResult] = useState('')

    const { address, isConnected } = useAccount()
    const chainId = useChainId()

    const {
        switchChain,
        error: switchChainError,
        isError: isSwitchChainError,
        isPending: isSwitchChainPending,
    } = useSwitchChain()

    const handleSwitchChain = useCallback(() => {
        switchChain({ chainId: chainId === base.id ? degen.id : base.id })
    }, [ switchChain, chainId ])


    const addFrame = useCallback(async () => {
        try {
            // setAddFrameResult('')
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
console.log('SDK.CONTEXT', await sdk.context)
        }

        if (sdk && !isSDKLoaded) {
            setIsSDKLoaded(true)
            load()
        }
    }, [ isSDKLoaded ])

    if (!isSDKLoaded) {
        return <div>Loading. Please wait...</div>
    }

    /**
     * Create Venue
     *
     * Executes either a new Bench or Table in the CasinoPoker contract.
     */
    // const _handleCreateVenue = async () => {

//         /* Initialize locals. */
//         let response

//         /* Build (data) package. */
//         const pkg = {
//             almost: 'there...',
//         }

//         /* Set method. */
//         const method = 'POST'

//         /* Set headers. */
//         const headers = { 'Content-Type': 'application/json' }

//         /* Serialize body. */
//         const body = JSON.stringify(pkg)

//         /* Build options. */
//         const options = {
//             method,
//             headers,
//             body,
//         }

//         /* Make (remote) data request. */
//         response = await fetch('https://cast.casino/v1', options)
//             .catch(err => console.error(err))
// console.log('API RESPONSE', response)

//         /* Handle response. */
//         response = await response
//             .json()
//             .catch(err => console.error(err))
//     console.log('API RESPONSE', response)
// alert(JSON.stringify(response))
    // }

    return (

    )
}

function SignIn() {
    const [signingIn, setSigningIn] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const [signInResult, setSignInResult] = useState<SignInResult>();
    const { data: session, status } = useSession()

    const getNonce = useCallback(async () => {
      const nonce = await getCsrfToken();
      if (!nonce) throw new Error("Unable to generate nonce");
      return nonce;
    }, []);

    const handleSignIn = useCallback(async () => {
      try {
        setSigningIn(true);
        const nonce = await getNonce();
console.log('SDK', sdk)
console.log('CONTEXT', await sdk.context)
        const result = await sdk.actions.signIn({ nonce });
        setSignInResult(result);

        await signIn("credentials", {
          message: result.message,
          signature: result.signature,
          redirect: false,
        });
      } finally {
        setSigningIn(false);
      }
    }, [getNonce]);

    const handleSignOut = useCallback(async () => {
      try {
        setSigningOut(true);
        await signOut({ redirect: false })
        setSignInResult(undefined);
      } finally {
        setSigningOut(false);
      }
    }, []);

    return (
      <>
        {status !== "authenticated" &&
          <Button
            onClick={handleSignIn}
            disabled={signingIn}
          >
            Sign In with Farcaster
          </Button>
        }
        {status === "authenticated" &&
          <Button
            onClick={handleSignOut}
            disabled={signingOut}
          >
            Sign out
          </Button>
        }
        {session &&
          <div class="my-2 p-2 text-xs overflow-x-scroll bg-gray-100 rounded-lg font-mono">
            <div class="font-semibold text-gray-500 mb-1">Session</div>
            <div class="whitespace-pre">{JSON.stringify(session, null, 2)}</div>
          </div>
        }
        {signInResult && !signingIn && (
          <div class="my-2 p-2 text-xs overflow-x-scroll bg-gray-100 rounded-lg font-mono">
            <div class="font-semibold text-gray-500 mb-1">SIWF Result</div>
            <div class="whitespace-pre">{JSON.stringify(signInResult, null, 2)}</div>
          </div>
        )}
      </>
    );
  }
