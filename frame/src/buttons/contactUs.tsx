/* Import modules. */
import { Button } from 'frames.js/express'

export default () => {
    return (
        <Button action="post" target={{ query: { screen: 'CONTACT_US', menu: 'HELP' } }}>
            Contact Us
        </Button>
    )
}
