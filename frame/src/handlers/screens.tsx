/* Import (local) modules. */
import gmImage from '../screens/gmImage.tsx'
import hiImage from '../screens/hiImage.tsx'

/**
 * Handle Image
 *
 * Manages the Frame images.
 */
export default (_ctx) => {
    /* Initialize locals. */
    let message

    /* Set message. */
    message = _ctx.message

    /* Validate message. */
    if (message) {
        return gmImage(_ctx)
    } else {
        return hiImage(_ctx)
    }
}
