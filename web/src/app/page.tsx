import { redirect } from 'next/navigation'

/* Add Edge support. */
export const runtime = 'edge'

export default async function AppRoot({}) {
    redirect('/5')
}
