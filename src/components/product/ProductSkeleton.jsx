const ProductSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl bg-(--color-background) animate-pulse">
      {/* Image skeleton */}
      <div className="h-64 w-full bg-slate-700" />

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 rounded bg-slate-700" />
        <div className="h-4 w-1/2 rounded bg-slate-700" />
        <div className="h-10 w-full rounded bg-slate-700" />
      </div>
    </div>
  );
};

export default ProductSkeleton;