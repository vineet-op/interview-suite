import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col pt-5  gap-5 space-y-3 p-5 mx-auto bg-gray-950/10">
            <Skeleton className="h-[250px] w-6xl rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-7/12" />
                <Skeleton className="h-8 w-7/12" />
            </div>

            <Skeleton className="h-[250px] w-6xl rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-7/12" />
                <Skeleton className="h-8 w-7/12" />
            </div>
        </div>
    )
}
