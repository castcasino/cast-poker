/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'PROFILE_EDIT', menu: 'PROFILE_EDIT' } }}>
            Edit ➚
        </Button>
    )
}
