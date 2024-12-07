/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'GAME_LOBBY', menu: 'WATCH' } }}>
            Watch 🍿
        </Button>
    )
}
