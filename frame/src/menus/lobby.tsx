/* Import (local) modules. */
import btnHelp from '../buttons/help/index.tsx'
import btnBuyIn from '../buttons/play/buy-in.tsx'
// import btnPlayQuick from '../buttons/play/quick.tsx'
// import btnLounge from '../buttons/lounge/index.tsx'
import btnNext from '../buttons/play/next.tsx'
import btnMainMenu from '../buttons/main/index.tsx'

export default () => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnBuyIn())
    buttons.push(btnNext())
    buttons.push(btnMainMenu())
    buttons.push(btnHelp())

    /* Return (menu) buttons. */
    return buttons
}
