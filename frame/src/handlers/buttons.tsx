/* Import (local) modules. */
import btnContactUs from '../buttons/contactUs.tsx'
import btnHelp from '../buttons/help.tsx'
import btnLeaderboard from '../buttons/leaderboard.tsx'
import btnLounge from '../buttons/lounge.tsx'
import btnMainMenu from '../buttons/mainMenu.tsx'
import btnProfile from '../buttons/profile.tsx'
import btnQuickPlay from '../buttons/quickPlay.tsx'
import btnUserGuide from '../buttons/userGuide.tsx'

const startMenu = () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnQuickPlay())
    buttons.push(btnMainMenu())
    buttons.push(btnLounge())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}

const helpMenu = () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnUserGuide())
    buttons.push(btnContactUs())
    buttons.push(btnMainMenu())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}

const loungeMenu = () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnLeaderboard())
    buttons.push(btnProfile())
    buttons.push(btnLounge())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}


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

    console.log('MY MENU', menu)
    console.log('MY SCREEN', screen)

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
