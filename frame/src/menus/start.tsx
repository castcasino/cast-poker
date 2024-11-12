/* Import (local) modules. */
import btnHelp from '../buttons/help/index.tsx'
import btnPlayQuick from '../buttons/play/quick.tsx'
import btnLounge from '../buttons/lounge/index.tsx'
import btnMainMenu from '../buttons/main/index.tsx'

export default () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnPlayQuick())
    buttons.push(btnMainMenu())
    buttons.push(btnLounge())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}
