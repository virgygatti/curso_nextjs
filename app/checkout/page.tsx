'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/firebase/orders';
import { getProductById, decrementStock } from '@/lib/firebase/products';
import type { OrderItem } from '@/types';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (items.length === 0 && !orderId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
          <Link href="/catalog">
            <Button>Ir al Catálogo</Button>
          </Link>
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!customer.name.trim()) e.name = 'Nombre requerido';
    if (!customer.email.trim()) e.email = 'Email requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) e.email = 'Email no válido';
    if (!customer.phone.trim()) e.phone = 'Teléfono requerido';
    if (!customer.address.trim()) e.address = 'Dirección requerida';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Validar stock actual
      for (const item of items) {
        const product = await getProductById(item.product.id);
        if (!product) {
          setSubmitError(`Producto "${item.product.name}" ya no está disponible.`);
          setIsSubmitting(false);
          return;
        }
        if (product.stock < item.quantity) {
          setSubmitError(
            `Stock insuficiente para "${item.product.name}". Disponible: ${product.stock}.`
          );
          setIsSubmitting(false);
          return;
        }
      }

      const orderItems: OrderItem[] = items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const id = await createOrder({
        items: orderItems,
        total: totalPrice,
        customer,
      });
      setOrderId(id);

      for (const item of items) {
        await decrementStock(item.product.id, item.quantity);
      }
      clearCart();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al crear la orden');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-3xl font-bold mb-4">¡Orden registrada!</h1>
        <p className="text-gray-600 mb-2">
          Tu orden <strong>#{orderId}</strong> fue creada correctamente.
        </p>
        <p className="text-gray-600 mb-6">
          Te contactaremos a {customer.email} para coordinar la entrega.
        </p>
        <Link href="/catalog">
          <Button>Seguir comprando</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="form-card grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Datos de contacto</h2>
          <div>
            <label className="form-label">Nombre completo</label>
            <input
              value={customer.name}
              onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
              className="input-form"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
              className="input-form"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
              className="input-form"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="form-label">Dirección de entrega</label>
            <textarea
              value={customer.address}
              onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
              className="input-form"
              rows={3}
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resumen</h2>
            <ul className="space-y-2 mb-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-2 text-sm">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-medium truncate">{item.product.name}</p>
                    <p className="text-gray-500">
                      {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.quantity * item.product.price).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4 flex justify-between font-semibold text-lg mb-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            {submitError && (
              <p className="text-red-600 text-sm mb-2" role="alert">
                {submitError}
              </p>
            )}
            <Button type="submit" className="w-full" loading={isSubmitting} disabled={isSubmitting}>
              Confirmar orden
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
