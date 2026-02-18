import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Completa tu compra. Ingresá tus datos y finalizá el pedido.',
  openGraph: {
    title: 'Checkout | E-commerce',
    description: 'Completa tu compra de forma segura.',
  },
  twitter: {
    card: 'summary',
    title: 'Checkout',
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
