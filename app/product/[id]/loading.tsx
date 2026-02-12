export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="h-12 bg-gray-200 rounded animate-pulse w-full mt-8" />
        </div>
      </div>
    </div>
  );
}
