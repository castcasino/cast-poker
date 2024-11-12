

/**
 * Handle Buttons
 *
 * Manages the Frame buttons.
 */
export default (_ctx: any) => {
console.log('INPUTS HANDLER (ctx)', _ctx)

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

    /* Handle screen. */
    if (screen === 'HELP_CONTACT') {
        return 'enter your email address'
    }
}
