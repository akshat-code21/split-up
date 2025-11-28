import GroupPage from "@/components/pages/GroupPage";
import { headers } from "next/headers";
import { QueryProvider } from "@/providers/QueryProvider";


export default async function SingleGroupPage({ params }: {
    params: Promise<{
        groupId: string
    }>
}) {
    const groupId = (await params).groupId;
    const headerList = await headers();
    const userId = headerList.get("x-user-id")
    return <QueryProvider>
        <GroupPage userId={userId!} groupId={groupId} />
    </QueryProvider>
}