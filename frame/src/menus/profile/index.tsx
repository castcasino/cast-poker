/* Import (local) modules. */
import btnHelp from '../../buttons/help/index.tsx'
import btnEdit from '../../buttons/profile/edit.tsx'
import btnShare from '../../buttons/profile/share.tsx'
import btnMainMenu from '../../buttons/main/index.tsx'

export default () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnEdit())
    buttons.push(btnShare())
    buttons.push(btnMainMenu())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}
