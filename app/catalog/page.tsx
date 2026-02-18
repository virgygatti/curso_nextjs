import { Suspense } from 'react';
import CatalogContent from './CatalogContent';
import CatalogSkeleton from './CatalogSkeleton';
import CategoryFilter from './CategoryFilter';
import { getCategories } from '@/lib/firebase/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Productos',
  description: 'Explora nuestro catálogo completo de productos. Encontrá lo que necesitás.',
  openGraph: {
    title: 'Catálogo de Productos | E-commerce',
    description: 'Explora nuestro catálogo completo de productos.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de Productos',
  },
};

export const revalidate = 60;

interface CatalogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { category } = await searchParams;
  const currentCategory = category && category.trim() ? category.trim() : null;
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>
      <CategoryFilter categories={categories} currentCategory={currentCategory} />
      <Suspense key={currentCategory ?? 'all'} fallback={<CatalogSkeleton />}>
        <CatalogContent category={currentCategory} />
      </Suspense>
    </div>
  );
}
