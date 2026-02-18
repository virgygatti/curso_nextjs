'use client';

import { Product } from '@/types';
import Image from 'next/image';
import Slider from '@/components/ui/Slider';
import Counter from '@/components/ui/Counter';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { addItem, items } = useCart();
  const images = product.images || [product.image];
  const itemInCart = items.find((i) => i.product.id === product.id);
  const quantityInCart = itemInCart?.quantity ?? 0;
  const availableStock = Math.max(product.stock - quantityInCart, 0);

  const handleAddToCart = async () => {
    setError(null);
    setSuccess(false);
    if (quantity < 1 || quantity > availableStock) {
      setError('Cantidad no válida.');
      return;
    }
    setIsAdding(true);
    try {
      addItem(product, quantity);
      setQuantity(1);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo agregar al carrito.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {images.length > 1 ? (
            <Slider images={images} alt={product.name} />
          ) : (
            <div className="relative aspect-square w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-800 mb-6">{product.description}</p>

          <div className="mb-6">
            <p className="text-sm text-gray-800 mb-2">
              Categoría: <span className="font-semibold text-slate-900">{product.category}</span>
            </p>
            <p className="text-sm text-gray-800">
              Stock disponible: <span className="font-semibold text-slate-900">{availableStock}</span>
            </p>
          </div>

          <div className="mb-6">
            <label className="form-label">
              Cantidad
            </label>
            <Counter
              key={`${product.id}-${availableStock}`}
              initialValue={1}
              min={1}
              max={availableStock}
              onValueChange={setQuantity}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-2" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-sm mb-2" role="status">
              Agregado al carrito correctamente.
            </p>
          )}
          <Button
            onClick={handleAddToCart}
            disabled={availableStock === 0}
            loading={isAdding}
            className="w-full"
          >
            {availableStock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
}
