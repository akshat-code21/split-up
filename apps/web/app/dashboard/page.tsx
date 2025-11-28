import { SummaryCards } from "@/components/dashboard/SummaryCards"
import { RecentExpenses } from "@/components/dashboard/RecentExpenses"
import { GroupBalances } from "@/components/dashboard/GroupBalances"

export default function DashboardPage() {
  return (
    <div className="space-y-6 w-full">
      <SummaryCards />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecentExpenses />
        <div className="md:col-span-1 w-full">
          <GroupBalances />
        </div>
      </div>
    </div>
  )
}
