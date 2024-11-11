/* Import (local) modules. */
import btnContactUs from '../buttons/contactUs.tsx'
import btnHelp from '../buttons/help.tsx'
import btnMainMenu from '../buttons/mainMenu.tsx'
import btnReload from '../buttons/reload.tsx'

export default () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnReload())
    buttons.push(btnContactUs())
    buttons.push(btnMainMenu())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}
