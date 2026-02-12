import { getProducts } from '@/lib/firebase/products';
import ProductList from '@/components/product/ProductList';

export default async function CatalogContent() {
  const products = await getProducts();
  return <ProductList products={products} />;
}
