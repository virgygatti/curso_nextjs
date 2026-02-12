import { getProducts } from '@/lib/firebase/products';
import ProductList from '@/components/product/ProductList';

export default async function FeaturedProducts() {
  const products = await getProducts();
  const featured = products.slice(0, 4);
  return <ProductList products={featured} />;
}
