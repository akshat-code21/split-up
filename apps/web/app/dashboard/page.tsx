// import { auth } from "app/(auth)/auth";

// export default async function Dashboard() {
//     const session = await auth()
//     if (!session?.user) return null
//     return (
//         <div>{JSON.stringify(session)}</div>
//     )
// }

import { SummaryCards } from "@/components/dashboard/SummaryCards"
import { RecentExpenses } from "@/components/dashboard/RecentExpenses"
import { GroupBalances } from "@/components/dashboard/GroupBalances"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryCards />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecentExpenses />
        <div className="md:col-span-1">
          <GroupBalances />
        </div>
      </div>
    </div>
  )
}
