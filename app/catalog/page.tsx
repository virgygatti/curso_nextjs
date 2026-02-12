import { Suspense } from 'react';
import CatalogContent from './CatalogContent';
import CatalogSkeleton from './CatalogSkeleton';

export const metadata = {
  title: 'Catálogo de Productos',
  description: 'Explora nuestro catálogo completo de productos',
};

export const revalidate = 60;

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogContent />
      </Suspense>
    </div>
  );
}
