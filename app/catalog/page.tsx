import { mockProducts } from '@/data/mockData';
import ProductList from '@/components/product/ProductList';

export const metadata = {
  title: 'Catálogo de Productos',
  description: 'Explora nuestro catálogo completo de productos',
};

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>
      <ProductList products={mockProducts} />
    </div>
  );
}
