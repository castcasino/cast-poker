/* Import (local) modules. */
import helpMenu from '../menus/help.tsx'
import loungeMenu from '../menus/lounge.tsx'
import startMenu from '../menus/start.tsx'


/**
 * Handle Buttons
 *
 * Manages the Frame buttons.
 */
export default (_ctx) => {
console.log('BUTTON HANDLER (ctx)', _ctx)

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
    case 'LOUNGE':
        return loungeMenu()
    default:
        return startMenu()
    }
}
