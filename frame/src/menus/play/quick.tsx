/* Import (local) modules. */
import btnNextGame from '../../buttons/play/next.tsx'
import btnHelp from '../../buttons/help/index.tsx'
import btnMainMenu from '../../buttons/main/index.tsx'
import btnReload from '../../buttons/reload.tsx'

export default () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnReload())
    buttons.push(btnNextGame())
    buttons.push(btnMainMenu())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}
