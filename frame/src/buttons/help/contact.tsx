/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'HELP_CONTACT', menu: 'HELP' } }}>
            Contact Us
        </Button>
    )
}
