'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '@/types';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/lib/firebase/products';
import ProductForm from '@/components/admin/ProductForm';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Spinner from '@/components/ui/Spinner';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getProducts();
      setProducts(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (data: ProductFormData) => {
    setError(null);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        await loadProducts();
        setEditingProduct(null);
        setShowForm(false);
      } else {
        await createProduct(data);
        await loadProducts();
        setShowForm(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al guardar el producto');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    setError(null);
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al eliminar');
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

      {error && (
        <p className="text-red-600 mb-4" role="alert">
          {error}
        </p>
      )}

      {showForm && (
        <div className="form-card bg-white rounded-lg shadow-md p-6 mb-8">
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

      {loading ? (
        <div className="flex items-center gap-3 py-12">
          <Spinner size="lg" />
          <span className="text-gray-600">Cargando productos...</span>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="form-card bg-white rounded-lg shadow-md overflow-hidden"
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
      )}
    </div>
  );
}
