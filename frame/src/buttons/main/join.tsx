/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'MENU_JOIN', menu: 'MENU_JOIN' } }}>
            Join Game
        </Button>
    )
}
