export async function GET() {
    const appUrl = process.env.NEXT_PUBLIC_URL

    const config = {
        accountAssociation: {
            header:
                'eyJmaWQiOjg4MjA0MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweGE5NjhkZGY0NzY5Y2U2OTFhYTFkM2VhMjE4ZjliMDAzOTNiMmNmNzIifQ==',
            payload: 'eyJkb21haW4iOiJjYXN0LnBva2VyIn0=',
            signature:
                'MHgwNDA4NmJjMTkxMDZiN2M0NTUzMzZmODliYTY0YzkzMThiYzE2NTMzMjJlZjFlZWVkODc1OWY1MzRjOTEyZmQxMmU4ZTA2MmJhYWJlZGI0MjZkZmFhMWZhMGQyNjZmNDQ2MTFhNzdlMjBiNjc4M2Q3OTM5ZTg5OWE3MjZhMTU2YjFj',
        },
        frame: {
            version: '0.0.0',
            name: 'Cast Poker',
            iconUrl: `${appUrl}/icon.png`,
            splashImageUrl: `${appUrl}/splash.png`,
            splashBackgroundColor: '#f7f7f7',
            homeUrl: appUrl,
            webhookUrl: `${appUrl}/api/webhook`,
        },
    }

    return Response.json(config)
}

// eyJmaWQiOjg4MjA0MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDdCZTRDNUMzZkY2M0RDRTMzODJFMjlCMWI4MTNFM2RjNDhhQWNERTEifQ
// eyJmaWQiOjg4MjA0MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweGE5NjhkZGY0NzY5Y2U2OTFhYTFkM2VhMjE4ZjliMDAzOTNiMmNmNzIifQ==
