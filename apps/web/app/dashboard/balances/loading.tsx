import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BalancesLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-white/10" />
          <Skeleton className="h-4 w-80 bg-white/5" />
        </div>
        <Skeleton className="h-10 w-32 bg-white/10" />
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-white/10 bg-card/30">
            <CardContent className="p-6 text-center space-y-3">
              <Skeleton className="h-5 w-24 mx-auto bg-white/10" />
              <Skeleton className="h-10 w-32 mx-auto bg-white/10" />
              <Skeleton className="h-3 w-40 mx-auto bg-white/5" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* People List Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-48 bg-white/10" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-white/10 bg-card/30">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24 bg-white/10" />
                    <Skeleton className="h-3 w-32 bg-white/5" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-20 bg-white/10" />
                    <Skeleton className="h-3 w-16 bg-white/5" />
                  </div>
                  <Skeleton className="h-9 w-20 bg-white/10" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
