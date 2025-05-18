/**
 * Frame Initialization
 *
 * Will hide the Farcaster frame splash screen.
 */
const initFrame = () => {
    /* Generate a message id. */
    const generateMessageId = () => {
        return Array(4)
            .fill(0)
            .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
            .join('-')
    }

    /* Generate message. */
    const message = {
        id: generateMessageId(),
        type: 'APPLY',
        path: ['ready'],
        argumentList: [{}]
    }

    /* Validate (webview) window. */
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(message))
    } else {
        window.parent.postMessage(message, '*')
    }
}
