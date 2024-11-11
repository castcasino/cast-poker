/* Import (local) modules. */
import btnHelp from '../../buttons/help.tsx'
import btnLeaderboard from '../../buttons/leaderboard.tsx'
import btnMainMenu from '../../buttons/mainMenu.tsx'
import btnProfile from '../../buttons/profile.tsx'

export default () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnLeaderboard())
    buttons.push(btnProfile())
    buttons.push(btnMainMenu())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}
