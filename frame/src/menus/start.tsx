/* Import (local) modules. */
import btnHelp from '../buttons/help.tsx'
import btnQuickPlay from '../buttons/quickPlay.tsx'
import btnLounge from '../buttons/lounge.tsx'
import btnMainMenu from '../buttons/mainMenu.tsx'

export default () => {
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
