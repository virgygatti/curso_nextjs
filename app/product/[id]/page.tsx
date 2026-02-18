import { getProductById, getProducts } from '@/lib/firebase/products';
import ProductDetail from '@/components/product/ProductDetail';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const title = product.name;
  const description =
    product.description?.slice(0, 160) ||
    `Comprar ${product.name} - $${product.price.toFixed(2)}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | E-commerce`,
      description,
      type: 'website',
      images: product.image
        ? [
            {
              url: product.image,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | E-commerce`,
      description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
