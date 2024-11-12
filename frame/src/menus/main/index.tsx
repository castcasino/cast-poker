/* Import (local) modules. */
import btnCreateGame from '../../buttons/main/create.tsx'
import btnHelp from '../../buttons/help/index.tsx'
import btnJoinGame from '../../buttons/main/join.tsx'
import btnLounge from '../../buttons/lounge/index.tsx'

export default () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnJoinGame())
    buttons.push(btnCreateGame())
    buttons.push(btnLounge())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}
