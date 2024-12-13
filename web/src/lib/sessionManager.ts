export const sessionManager = async (context: string) => {
console.log('SESSION MANAGER HAS BEEN INITIALIZED!!', context)

    /* Build body. */
    const body = JSON.stringify({
        method: 'manage-session',
        pkg: context,
    })

    /* Send session. */
    const response = await fetch('https://cast.casino/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
    })

    const data = await response.json()
console.log('SESSION MANAGER (data)', data)
}
