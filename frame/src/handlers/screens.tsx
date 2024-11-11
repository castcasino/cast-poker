/* Import (local) modules. */
import gmImage from '../screens/gmImage.tsx'
import hiImage from '../screens/hiImage.tsx'
import quickPlay from '../screens/quickPlay.tsx'

import help from '../screens/help/index.tsx'
import helpContactUs from '../screens/help/contactUs.tsx'

/**
 * Handle Image
 *
 * Manages the Frame images.
 */
export default (_ctx) => {
    /* Initialize locals. */
    let message
    let params
    let screen

    /* Set message. */
    message = _ctx.message

    /* Set parameters. */
    params = _ctx.searchParams
// console.log('PARAMS', params)

    /* Validate parameters. */
    if (typeof params !== 'undefined') {
        /* Set screen. */
        screen = params.screen
    }
// console.log('SCREEN', screen)

    /* Handle screen selection. */
    switch(screen) {
    case 'HELP':
        return help(_ctx)
    case 'HELP_CONTACT_US':
        return helpContactUs(_ctx)

    case 'MAIN_MENU':
        return hiImage(_ctx)
    case 'QUICK_PLAY':
        return quickPlay(_ctx)
    default:
        return gmImage(_ctx)
    }
}
