/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'QUICK_PLAY', menu: 'PLAY' } }}>
            Quick Play
        </Button>
    )
}
