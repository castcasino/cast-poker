/* Import (local) modules. */
import btnHelp from '../../buttons/help.tsx'
import btnPrevious from '../../buttons/lounge/previous.tsx'
import btnMainMenu from '../../buttons/mainMenu.tsx'
import btnNext from '../../buttons/lounge/next.tsx'

export default () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnPrevious())
    buttons.push(btnNext())
    buttons.push(btnMainMenu())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}
