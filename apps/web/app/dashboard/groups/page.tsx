import GroupsPage from "@/components/pages/GroupsPage"
import { headers } from "next/headers";
import axios from "axios";

export default async function Groups() {
  const getGroupsForUser = async(userId: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`, {
      headers: {
        'x-user-id': userId,
      },
    })
    return res.data.data;
  }
  const headerList = await headers();
  const userId = headerList.get('x-user-id') || "";
  const groups = await getGroupsForUser(userId as string)
  return <GroupsPage userId={userId as string} initialGroups={groups as any[]} />
}