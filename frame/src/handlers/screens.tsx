/* Import (local) modules. */
import gmImage from '../screens/gmImage.tsx'
import hiImage from '../screens/hiImage.tsx'

/* Import Help & Support */
import help from '../screens/help/index.tsx'
import helpContactUs from '../screens/help/contactUs.tsx'
import helpUserGuide from '../screens/help/userGuide.tsx'

/* Import Play */
import quickPlay from '../screens/quickPlay.tsx'

/* Import Player's Lounge */
import lounge from '../screens/lounge/index.tsx'
import loungeLeaderboard from '../screens/lounge/leaderboard.tsx'

/* Import Player Profile */
import profile from '../screens/profile/index.tsx'

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
    /* Start / Landing */
    case 'MAIN_MENU':
        return hiImage(_ctx)

    /* Help & Support */
    case 'HELP':
        return help(_ctx)
    case 'HELP_CONTACT_US':
        return helpContactUs(_ctx)
    case 'HELP_USER_GUIDE':
        return helpUserGuide(_ctx)

    /* Player's Lounge */
    case 'LOUNGE':
        return lounge(_ctx)
    case 'LOUNGE_LEADERBOARD':
        return loungeLeaderboard(_ctx)

    /* Play */
    case 'QUICK_PLAY':
        return quickPlay(_ctx)

    /* Player Profile */
    case 'PROFILE':
        return profile(_ctx)

    default:
        return gmImage(_ctx)
    }
}
