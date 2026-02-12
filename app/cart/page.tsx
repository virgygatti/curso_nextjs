'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Counter from '@/components/ui/Counter';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, totalPrice: total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
          <Link href="/catalog">
            <Button>Ir al Catálogo</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-4 flex gap-4"
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold mb-1">{item.product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-4">
                    <Counter
                      key={`${item.product.id}-${item.quantity}`}
                      initialValue={item.quantity}
                      min={1}
                      max={item.product.stock}
                      onValueChange={(qty) => updateQuantity(item.product.id, qty)}
                    />
                    <Button
                      variant="danger"
                      onClick={() => removeItem(item.product.id)}
                      className="text-sm"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resumen</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {checkoutError && (
              <p className="text-red-600 text-sm mb-2" role="alert">
                {checkoutError}
              </p>
            )}
            <Button
              className="w-full"
              loading={isCheckingOut}
              onClick={async () => {
                setCheckoutError(null);
                setIsCheckingOut(true);
                try {
                  await new Promise((resolve) => setTimeout(resolve, 800));
                  setCheckoutError('Checkout en desarrollo. Próximamente disponible.');
                } catch (e) {
                  setCheckoutError(e instanceof Error ? e.message : 'Error al procesar.');
                } finally {
                  setIsCheckingOut(false);
                }
              }}
            >
              Finalizar Compra
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
