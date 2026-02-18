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
  const { addItem } = useCart();
  const images = product.images || [product.image];

  const handleAddToCart = async () => {
    setError(null);
    setSuccess(false);
    if (quantity < 1 || quantity > product.stock) {
      setError('Cantidad no válida.');
      return;
    }
    setIsAdding(true);
    try {
      addItem(product, quantity);
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

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">
              Categoría: <span className="font-medium">{product.category}</span>
            </p>
            <p className="text-sm text-gray-500">
              Stock disponible: <span className="font-medium">{product.stock}</span>
            </p>
          </div>

          <div className="mb-6">
            <label className="form-label">
              Cantidad
            </label>
            <Counter
              initialValue={1}
              min={1}
              max={product.stock}
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
            disabled={product.stock === 0}
            loading={isAdding}
            className="w-full"
          >
            {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
}
