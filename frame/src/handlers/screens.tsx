/* Import Start. */
// import start from '../screens/start.tsx'
import start from '../screens/lobby.tsx'
// import start from '../screens/profile/index.tsx'

/* Import Main. */
import mainMenu from '../screens/main/index.tsx'

/* Import Help & Support */
import help from '../screens/help/index.tsx'
import helpContactUs from '../screens/help/contact.tsx'
import helpUserGuide from '../screens/help/guide.tsx'

/* Import Play */
import quickPlay from '../screens/play/quick.tsx'

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
export default (_ctx: any) => {
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
    /* Main */
    case 'MAIN_MENU':
        return mainMenu(_ctx)

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
        return start(_ctx)
    }
}
