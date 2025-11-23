import { auth } from "app/(auth)/auth";

export default async function Dashboard() {
    const session = await auth()
    if (!session?.user) return null
    return (
        <div>{JSON.stringify(session)}</div>
    )
}