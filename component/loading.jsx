export default function MenuSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-40 bg-gray-200 animate-pulse rounded-xl"
        />
      ))}
    </div>
  )
}