/* Import modules. */
import { sdk } from '@farcaster/frame-sdk'
import { defineStore } from 'pinia'

/**
 * Profile Store
 */
export const useProfileStore = defineStore('profile', {
    state: () => ({
            /* Initialize session. */
            _session: null,

            /* Display name. */
            _user: null,

            _apiKeys: {},
    }),

    getters: {
        session(_state) {
            return _state._session || null
        },

        sessionid(_state) {
            return _state._session?.sessionid || null
        },

        challenge(_state) {
            return _state._session?.challenge || null
        },

        user(_state) {
            return _state._user
        },

        fid(_state) {
            return _state._user?.fid
        },

        username(_state) {
            return _state._user?.username
        },

        displayName(_state) {
            return _state._user?.displayName
        },

        pfpUrl(_state) {
            return _state._user?.pfpUrl
        },

        apiKey(_state) {
            return (_exchangeid) => _state._apiKeys[_exchangeid] || null
        },
    },

    actions: {
        async init () {
            /* Initialize locals. */
            let response
            let session

            /* Request Mini App flag. */
            const isMiniApp = await sdk.isInMiniApp()

            /* Validate Mini App. */
            if (isMiniApp) {
                /* Request app context. */
                const context = await sdk.context

                /* Set user. */
                this._user = context.user
            }

            /* Check for existing session. */
            if (this._session && this._session.sessionid) {
                /* Request new session. */
                response = await $fetch('https://cast.casino/graphql', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        query: `mutation ManageSession {
                          manageSession(sessionid: "${this._session.sessionid}") {
                            sessionid
                            nonce
                            hasAuth
                            createdAt
                          }
                        }`
                    })
                }).catch(err => console.error(err))

                if (response?.data?.manageSession?.sessionid === this._session.sessionid) {
                    return this._session // FIXME We don't return to anyone?
                } else {
                    console.error('Oops! This session has expired.')
                    this.deleteSession()
                    // alert(`You've been signed out! Please re-signin to continue...`)

                    /* Re-start initialization. */
                    setTimeout(this.init, 100)
                    return
                }
            }

            /* Request new session. */
            response = await $fetch('https://cast.casino/graphql', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    query: `mutation ManageSession {
                      manageSession {
                        sessionid
                        nonce
                        hasAuth
                        createdAt
                      }
                    }`
                })
            }).catch(err => console.error(err))

            /* Validate response. */
            if (typeof response !== 'undefined' && response !== null) {
                session = response.data?.manageSession

                /* Set session. */
                this._setSession(session)
            }
console.log('SESSION', session)

            /* Return session. */
            return session
        },

        async register (_message, _signature) {
// console.log('REGISTER SESSION', this._session)
            /* Check for existing session. */
            if (!this._session) {
                throw new Error('Oops! You MUST already have an active session.')
            }

            /* Initialize locals. */
            let message
            let session

            /* Sanitize message. */
            message = _message.replace(/\n/g, '\\n')

// TODO Validate message.

            const body = JSON.stringify({
                query: `mutation ManageSession {
                  manageSession(
                  sessionid: "${this.sessionid}",
                  message: "${message}",
                  signature: "${_signature}"
                ) {
                    sessionid
                    nonce
                    hasAuth
                    createdAt
                  }
                }`
            })

            /* Request new session. */
            const response = await $fetch('https://cast.casino/graphql', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body,
            }).catch(err => console.error(err))

            /* Validate response. */
            if (typeof response !== 'undefined' && response !== null) {
                session = response.data?.manageSession

                /* Set session. */
                this._setSession(session)
            }

            /* Return session. */
            return session
        },

        deleteSession() {
            /* Set session. */
            this._setSession(null)
        },

        saveSession(_session) {
            /* Set session. */
            this._setSession(_session)
        },

        /**
         * Set Session
         *
         * @param {Object} _session Save session details.
         */
        _setSession (_session) {
            /* Set session. */
            this._session = _session
            // console.log('SET SESSION', this._session)
        },

        /**
         * Set API Key
         *
         * @param {Object} _key Information for the Exchange's API key.
         */
        setApiKey (_key: Object) {
            /* Set session. */
            this._apiKeys[_key.exchangeid] = _key
            console.log('SET API KEY', this._apiKeys)
        },
    },
})
