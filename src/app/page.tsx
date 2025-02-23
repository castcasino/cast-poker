import { redirect } from 'next/navigation'

export const runtime = 'edge'

export default async function AppRoot({}) {
    redirect('/5')
}
