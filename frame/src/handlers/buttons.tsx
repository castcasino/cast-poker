/* Import (local) modules. */
import helpMenu from '../menus/help.tsx'
import playMenu from '../menus/play.tsx'
import startMenu from '../menus/start.tsx'

/* Player's Lounge */
import loungeMenu from '../menus/lounge/index.tsx'
import loungeLeaderboard from '../menus/lounge/leaderboard.tsx'

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
    case 'HELP':
        return helpMenu()

    /* Player's Lounge */
    case 'LOUNGE':
        return loungeMenu()
    case 'LOUNGE_LEADERBOARD':
        return loungeLeaderboard()

    case 'PLAY':
        return playMenu()
    default:
        return startMenu()
    }
}
