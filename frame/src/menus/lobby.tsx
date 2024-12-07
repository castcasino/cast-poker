/* Import (local) modules. */
import btnHelp from '../buttons/help/index.tsx'
import btnBuyIn from '../buttons/play/buy-in.tsx'
// import btnPlayQuick from '../buttons/play/quick.tsx'
// import btnLounge from '../buttons/lounge/index.tsx'
import btnNext from '../buttons/play/next.tsx'
// import btnMainMenu from '../buttons/main/index.tsx'
import btnLobby from '../buttons/main/lobby.tsx'
import btnWatch from '../buttons/play/watch.tsx'

export default () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnLobby())
    buttons.push(btnHelp())
    buttons.push(btnNext())
    // buttons.push(btnBuyIn())
    buttons.push(btnWatch())

    /* Return (menu) buttons. */
    return buttons
}
