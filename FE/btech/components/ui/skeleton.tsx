import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

function SkeletonRow() {
  return (
    <div className="flex space-x-4">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-20 h-4" />
      </div>
    </div>
  )
}

export { Skeleton, SkeletonRow }