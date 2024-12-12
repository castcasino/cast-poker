import { redirect } from 'next/navigation'

export default async function AppRoot({}) {
    redirect('/1337')
}
