'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import CartLink from './CartLink';

export default function AuthNavLinks() {
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <>
        <Link href="/catalog" className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
          Catálogo
        </Link>
        <CartLink />
        <span className="text-gray-400">...</span>
      </>
    );
  }

  return (
    <>
      <Link href="/catalog" className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
        Catálogo
      </Link>
      <CartLink />
      {user ? (
        <>
          <Link href="/admin" className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
            Admin
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <Link href="/login" className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
          Iniciar sesión
        </Link>
      )}
    </>
  );
}
