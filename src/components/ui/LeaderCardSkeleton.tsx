export const LeaderCardSkeleton = () => {
  return (
    <div className="group w-full text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200/80 animate-pulse">
      {/* Avatar skeleton */}
      <div className="w-40 h-40 rounded-full mx-auto bg-slate-200 ring-4 ring-slate-100"></div>

      <div className="mt-4">
        {/* Name skeleton */}
        <div className="h-6 bg-slate-200 rounded w-3/4 mx-auto mb-2"></div>

        {/* Role skeleton */}
        <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto mb-2"></div>

        {/* Description skeleton */}
        <div className="space-y-2 mt-2 h-24">
          <div className="h-3 bg-slate-200 rounded w-full"></div>
          <div className="h-3 bg-slate-200 rounded w-5/6 mx-auto"></div>
          <div className="h-3 bg-slate-200 rounded w-4/6 mx-auto"></div>
        </div>

        {/* LinkedIn icon skeleton */}
        <div className="mt-4 flex justify-center">
          <div className="w-6 h-6 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const LeadersSkeleton = ({ count = 6 }: { count?: number }) => {
  return Array.from({ length: count }).map((_, index) => (
    <LeaderCardSkeleton key={index} />
  ));
};
