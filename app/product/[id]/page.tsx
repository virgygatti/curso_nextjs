import { mockProducts } from '@/data/mockData';
import ProductDetail from '@/components/product/ProductDetail';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
