import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrito',
  description: 'Tu carrito de compras. Revisá los productos y finalizá tu compra.',
  openGraph: {
    title: 'Carrito | E-commerce',
    description: 'Revisá los productos en tu carrito y finalizá tu compra.',
  },
  twitter: {
    card: 'summary',
    title: 'Carrito',
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
