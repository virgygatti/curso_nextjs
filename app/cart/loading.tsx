export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded animate-pulse flex-shrink-0" />
              <div className="flex-grow space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
