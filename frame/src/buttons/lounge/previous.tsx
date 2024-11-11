/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'LOUNGE_LEADERBOARD', menu: 'LOUNGE_LEADERBOARD', idx: 0 } }}>
            ⇐ Prev
        </Button>
    )
}
