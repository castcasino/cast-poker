/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'LOBBY', menu: 'LOBBY' } }}>
            Lobby ↗
        </Button>
    )
}
