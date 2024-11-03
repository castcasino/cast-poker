import express from 'express'
import { createFrames, Button } from 'frames.js/express'

const app = express()
const frames = createFrames()

/**
 * Handle Request
 *
 * Manages all requests.
 */
const handleRequest = frames(async (_ctx) => {
    return {
        image: <span>My image</span>,
        buttons: [<Button action="post">Click me</Button>],
    }
})

app.get('/', handleRequest)
app.post('/', handleRequest)
