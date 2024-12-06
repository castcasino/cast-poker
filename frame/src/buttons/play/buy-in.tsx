/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'GAME_LOBBY', menu: 'BUY_IN' } }}>
            ＄ Buy In ＄
        </Button>
    )
}
