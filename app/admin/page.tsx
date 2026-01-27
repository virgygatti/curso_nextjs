'use client';

import { useState } from 'react';
import { mockProducts } from '@/data/mockData';
import { Product, ProductFormData } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      // Actualizar producto existente
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...data } : p
        )
      );
      setEditingProduct(null);
    } else {
      // Crear nuevo producto
      const newProduct: Product = {
        ...data,
        id: Date.now().toString(),
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setShowForm(false);
    alert(editingProduct ? 'Producto actualizado' : 'Producto creado');
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Nuevo Producto</Button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <ProductForm
            product={editingProduct || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => handleEdit(product)}
                  className="flex-1 text-sm"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 text-sm"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
