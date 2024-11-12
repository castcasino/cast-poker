/* Import (local) modules. */
import btnHelp from '../../buttons/help/index.tsx'
import btnLeaderboard from '../../buttons/lounge/leaderboard.tsx'
import btnMainMenu from '../../buttons/main/index.tsx'
import btnProfile from '../../buttons/profile/index.tsx'

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
