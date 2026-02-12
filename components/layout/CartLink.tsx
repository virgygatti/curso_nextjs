'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1"
    >
      Carrito
      {totalItems > 0 && (
        <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
