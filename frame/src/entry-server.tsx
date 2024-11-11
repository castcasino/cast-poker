/* Import modules. */
import { farcasterHubContext } from 'frames.js/middleware'
import { createFrames } from 'frames.js/express'

/* Import (local) modules. */
import handleButtons from './handlers/buttons.tsx'
import handleScreens from './handlers/screens.tsx'

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
 * Handle Request
 *
 * Manages a Frames request.
 */
export const handleRequest = frames(_ctx => {
// console.log('CONTEXT', _ctx)
    return {
        image: handleScreens(_ctx),
        buttons: handleButtons(_ctx),
    }
})
