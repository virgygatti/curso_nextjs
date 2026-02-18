import Link from 'next/link';

interface CategoryFilterProps {
  categories: string[];
  currentCategory: string | null;
}

export default function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/catalog"
        className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors ${
          !currentCategory
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Todos
      </Link>
      {categories.map((cat) => {
        const slug = encodeURIComponent(cat);
        const isActive = currentCategory === cat;
        return (
          <Link
            key={cat}
            href={`/catalog?category=${slug}`}
            className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}
