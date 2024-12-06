/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'MAIN_MENU', menu: 'MAIN_MENU' } }}>
            Menu ↗
        </Button>
    )
}
