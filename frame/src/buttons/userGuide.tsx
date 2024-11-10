/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'USER_GUIDE', menu: 'HELP' } }}>
            User Guide
        </Button>
    )
}
