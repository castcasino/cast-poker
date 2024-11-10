/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'PROFILE', menu: 'PROFILE' } }}>
            Profile
        </Button>
    )
}
