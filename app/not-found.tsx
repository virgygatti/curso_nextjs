import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-8">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link href="/">
        <Button>Volver al Inicio</Button>
      </Link>
    </div>
  );
}
