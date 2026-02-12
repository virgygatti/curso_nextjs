import Link from 'next/link';
import { Suspense } from 'react';
import Button from '@/components/ui/Button';
import FeaturedProducts from './FeaturedProducts';
import FeaturedSkeleton from './FeaturedSkeleton';

export const revalidate = 60;

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a nuestro E-commerce</h1>
        <p className="text-xl text-gray-600 mb-8">
          Descubre nuestros productos destacados
        </p>
        <Link href="/catalog">
          <Button>Ver Catálogo Completo</Button>
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Productos Destacados</h2>
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </div>
  );
}
