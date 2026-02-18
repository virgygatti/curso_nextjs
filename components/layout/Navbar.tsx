import Link from 'next/link';
import AuthNavLinks from './AuthNavLinks';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="cursor-pointer text-xl font-bold text-blue-600">
              E-commerce
            </Link>
            <div className="flex gap-4">
              <AuthNavLinks />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
