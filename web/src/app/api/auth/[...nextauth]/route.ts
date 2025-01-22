import NextAuth from 'next-auth'
import { authOptions } from '~/auth'

/* Add Edge support. */
export const runtime = 'edge'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
