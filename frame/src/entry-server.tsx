/* Import modules. */
import { farcasterHubContext } from 'frames.js/middleware'
import { createFrames, Button } from 'frames.js/express'

/**
 * Frames
 *
 * Initialize the Frames handler.
 */
const frames = createFrames({
    middleware: [
        farcasterHubContext({
            ...(process.env.NODE_ENV === 'production'
                ? {}
                : {
                    hubHttpUrl: 'http://localhost:3010/hub',
                }),
        }),
    ],
})

/**
 * Landing Page Buttons
 *
 * Handles the initial buttons displayed to the user.
 */
const btnLandingPage = () => {
    return (
        <Button action="post" key="1" target={{ query: { saidGm: true } }}>
            Say GM!!
        </Button>
    )
}

/**
 * Handle Buttons
 *
 * Manages the Frame buttons.
 */
const handleButtons = (_ctx) => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnLandingPage())

    /* Handle search parameters. */
    if (!_ctx.url.searchParams.has('saidGm')) {
        return buttons
    } else {
        return []
    }
}

const hiImage = (_ctx) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            Hi there!
        </div>
    )
}

const gmImage = (_ctx) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            GM, {_ctx.message.requesterUserData?.displayName}! Your FID is{" "}
            {_ctx.message.requesterFid}
            {", "}
            {_ctx.message.requesterFid < 20_000
                ? "you're OG!"
                : "welcome to the Farcaster!"
            }
        </div>
    )
}

/**
 * Handle Image
 *
 * Manages the Frame images.
 */
const handleImage = (_ctx) => {
    /* Initialize locals. */
    let message

    /* Set message. */
    message = _ctx.message

    /* Validate message. */
    if (message) {
        return gmImage(_ctx)
    } else {
        return hiImage(_ctx)
    }
}

export const handleRequest = frames(_ctx => {
// console.log('CONTEXT', _ctx)
    return {
        image: handleImage(_ctx),
        buttons: handleButtons(_ctx),
    }
})
