import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardHeader } from '../ui/card'

const GroupSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-10 w-10 rounded" />
                <div className="flex-1">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-10 rounded" />
                    <Skeleton className="h-10 w-10 rounded" />
                </div>
            </div>

            {/* Summary Cards Skeleton */}
            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-9 w-16" />
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Expenses Skeleton */}
                <Card className="border-white/10 bg-card/40 backdrop-blur-sm lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <Skeleton className="h-6 w-32 mb-1" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                            <Skeleton className="h-10 w-28" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i}>
                                    {i > 1 && <div className="h-px bg-white/10 my-2"></div>}
                                    <div className="flex items-start justify-between py-3">
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-5 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </div>
                                        <div className="text-right space-y-1">
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Members & Balances Skeleton */}
                <div className="space-y-6">
                    {/* Members List Skeleton */}
                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-20 mb-1" />
                            <Skeleton className="h-4 w-28" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Balances Skeleton */}
                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-20 mb-1" />
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex justify-between py-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default GroupSkeleton
