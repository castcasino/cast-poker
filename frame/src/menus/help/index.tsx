/* Import (local) modules. */
import btnContactUs from '../../buttons/help/contact.tsx'
import btnHelp from '../../buttons/help/index.tsx'
import btnMainMenu from '../../buttons/main/index.tsx'
import btnUserGuide from '../../buttons/help/guide.tsx'

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
