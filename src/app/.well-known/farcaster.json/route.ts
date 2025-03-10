/* Import modules. */
import moment from 'moment'

export const runtime = 'edge'

// FIXME THIS SHOULD DYNAMIC FROM API
const tableid = 4

export async function GET() {
    const appUrl = process.env.NEXT_PUBLIC_URL

    const config = {
        accountAssociation: {
            header:
                'eyJmaWQiOjg4MjA0MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDdCZTRDNUMzZkY2M0RDRTMzODJFMjlCMWI4MTNFM2RjNDhhQWNERTEifQ',
            payload: 'eyJkb21haW4iOiJjYXN0LnBva2VyIn0',
            signature:
                'MHgwNDA4NmJjMTkxMDZiN2M0NTUzMzZmODliYTY0YzkzMThiYzE2NTMzMjJlZjFlZWVkODc1OWY1MzRjOTEyZmQxMmU4ZTA2MmJhYWJlZGI0MjZkZmFhMWZhMGQyNjZmNDQ2MTFhNzdlMjBiNjc4M2Q3OTM5ZTg5OWE3MjZhMTU2YjFj'
        },
        frame: {
            version: '1',
            name: 'Cast Poker',
            iconUrl: `${appUrl}/logo.png`,
            splashImageUrl: `${appUrl}/splash.gif`,
            splashBackgroundColor: '#cd98f9',
            homeUrl: appUrl,
            webhookUrl: `${appUrl}/api/webhook`,
            imageUrl: `${appUrl}/${tableid}/opengraph-image?${moment().unix()}`,
            buttonTitle: "Watch Table",
        },
    }

    return Response.json(config)
}
