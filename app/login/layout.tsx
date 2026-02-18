import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Acceso al panel de administración',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Iniciar sesión | E-commerce',
    description: 'Acceso al panel de administración',
  },
  twitter: {
    card: 'summary',
    title: 'Iniciar sesión',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
