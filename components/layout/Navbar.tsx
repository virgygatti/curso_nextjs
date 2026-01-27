import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-blue-600">
              E-commerce
            </Link>
            <div className="flex gap-4">
              <Link
                href="/catalog"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Catálogo
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Carrito
              </Link>
              <Link
                href="/admin"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
