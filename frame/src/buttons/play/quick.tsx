/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'PLAY_QUICK', menu: 'PLAY_QUICK' } }}>
            Quick Play
        </Button>
    )
}
