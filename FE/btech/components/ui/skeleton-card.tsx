import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden  border border-transparent dark:border-white/[0.2] relative z-20 animate-pulse",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100">
        <div className="h-32 bg-primary/20"></div> {/* Simulates an image */}
      </div>
      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-65 transition-all duration-200 ease-in-out"></div>
      <div className="relative z-50">
        <div className="p-4">
          <div className="h-4 bg-primary/20 mb-2"></div> {/* Simulates a title */}
          <div className="h-3 bg-primary/20 mb-2"></div> {/* Simulates a line of text */}
          <div className="h-3 bg-primary/20"></div> {/* Simulates a line of text */}
        </div>
      </div>
    </div>
  )
}

export { Skeleton }