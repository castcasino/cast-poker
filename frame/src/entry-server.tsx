/* Import modules. */
import { farcasterHubContext } from 'frames.js/middleware'
// import { neynarValidate } from 'frames.js/middleware/neynar'
import { createFrames } from 'frames.js/express'

/* Import (local) modules. */
import handleInputs from './handlers/inputs.tsx'
import handleMenus from './handlers/menus.tsx'
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
        // neynarValidate({
        //     API_KEY: process.env.NEYNAR_API_KEY!,
        // }),
    ],
    imagesRoute: '/',
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
        imageOptions: {
            aspectRatio: '1:1', // or 1.91:1
        },
        buttons: handleMenus(_ctx),
        textInput: handleInputs(_ctx),
    }
})
