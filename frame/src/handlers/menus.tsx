/* Import (local) modules. */
import helpMenu from '../menus/help/index.tsx'
import playQuickMenu from '../menus/play/quick.tsx'
// import startMenu from '../menus/start.tsx'
import startMenu from '../menus/lobby.tsx'

/* Main */
import mainMenu from '../menus/main/index.tsx'

/* Player's Lounge */
import loungeMenu from '../menus/lounge/index.tsx'
import loungeLeaderboard from '../menus/lounge/leaderboard.tsx'

/* Player Profile */
import profileMenu from '../menus/profile/index.tsx'

/**
 * Handle Buttons
 *
 * Manages the Frame buttons.
 */
export default (_ctx: any) => {
// console.log('BUTTON HANDLER (ctx)', _ctx)

    /* Initialize locals. */
    let menu
    let screen

    /* Validate menu. */
    if (_ctx.url.searchParams.has('menu')) {
        /* Set menu. */
        menu = _ctx.searchParams.menu
    }

    /* Validate screen. */
    if (_ctx.url.searchParams.has('screen')) {
        /* Set screen. */
        screen = _ctx.searchParams.screen
    }

    /* Handle menu. */
    switch(menu) {
    /* Main */
    case 'MAIN_MENU':
        return mainMenu()

    /* Help & Support */
    case 'HELP':
        return helpMenu()

    /* Player's Lounge */
    case 'LOUNGE':
        return loungeMenu()
    case 'LOUNGE_LEADERBOARD':
        return loungeLeaderboard()

    /* Play */
    case 'PLAY_QUICK':
        return playQuickMenu()

    /* Player Profile */
    case 'PROFILE':
        return profileMenu()

    default:
        return startMenu()
    }
}
