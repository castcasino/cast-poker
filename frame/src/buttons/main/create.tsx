/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'MENU_CREATE', menu: 'MENU_CREATE' } }}>
            Create Game
        </Button>
    )
}
