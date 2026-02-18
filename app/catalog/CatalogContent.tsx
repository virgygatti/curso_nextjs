import { getProducts, getProductsByCategory } from '@/lib/firebase/products';
import ProductList from '@/components/product/ProductList';

interface CatalogContentProps {
  category?: string | null;
}

export default async function CatalogContent({ category }: CatalogContentProps) {
  const products = category
    ? await getProductsByCategory(category)
    : await getProducts();

  if (products.length === 0) {
    return (
      <p className="text-gray-500 text-center py-12">
        {category
          ? `No hay productos en la categoría "${category}".`
          : 'No hay productos en el catálogo.'}
      </p>
    );
  }

  return <ProductList products={products} />;
}
