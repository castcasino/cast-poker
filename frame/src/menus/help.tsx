/* Import (local) modules. */
import btnContactUs from '../buttons/contactUs.tsx'
import btnHelp from '../buttons/help.tsx'
import btnMainMenu from '../buttons/mainMenu.tsx'
import btnUserGuide from '../buttons/userGuide.tsx'

export default () => {
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
