'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, ProductFormData } from '@/types';
import Button from '@/components/ui/Button';
import ImageUpload from './ImageUpload';

function emptyForm(): ProductFormData {
  return {
    name: '',
    description: '',
    price: 0,
    image: '',
    images: [],
    category: '',
    stock: 0,
  };
}

function productToFormData(p: Product): ProductFormData {
  const filtered = p.images?.filter(Boolean) ?? [];
  const imgs =
    filtered.length > 0 ? [...filtered] : p.image ? [p.image] : [];
  return {
    name: p.name,
    description: p.description,
    price: p.price,
    image: imgs[0] ?? p.image ?? '',
    images: imgs,
    category: p.category,
    stock: p.stock,
  };
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => void;
  onCancel?: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(() =>
    product ? productToFormData(product) : emptyForm()
  );

  useEffect(() => {
    setFormData(product ? productToFormData(product) : emptyForm());
  }, [product?.id]);

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (!formData.images.length || !formData.images.some(Boolean)) {
      newErrors.image = 'Agrega al menos una imagen';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es requerida';
    }
    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      const images = formData.images.filter(Boolean);
      onSubmit({
        ...formData,
        images,
        image: images[0] ?? '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ProductFormData, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors && errors[field as keyof ProductFormData]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addImageUrl = (url: string) => {
    if (!url.trim()) return;
    setFormData((prev) => {
      const next = [...prev.images, url];
      return {
        ...prev,
        images: next,
        image: next[0],
      };
    });
    if (errors.image) setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => {
      const next = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: next,
        image: next[0] ?? '',
      };
    });
  };

  const setAsPrimary = (index: number) => {
    if (index <= 0) return;
    setFormData((prev) => {
      const next = [...prev.images];
      const [item] = next.splice(index, 1);
      next.unshift(item);
      return { ...prev, images: next, image: next[0] ?? '' };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label">Nombre</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="input-form"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="form-label">Descripción</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="input-form"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Precio</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
            className="input-form"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="form-label">Stock</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
            className="input-form"
          />
          {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Categoría</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="input-form"
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="form-label">Imágenes del producto</label>
        <p className="text-sm text-gray-500 mb-2">
          La primera imagen es la principal (tarjetas y vista previa). Puedes añadir varias para el
          carrusel.
        </p>
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
            {formData.images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group"
              >
                <Image src={url} alt="" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                {index === 0 && (
                  <span className="absolute top-1 left-1 text-xs bg-amber-500 text-white px-1.5 py-0.5 rounded">
                    Principal
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex gap-1 p-1 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1 text-xs py-1"
                      onClick={() => setAsPrimary(index)}
                    >
                      Principal
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="danger"
                    className="flex-1 text-xs py-1"
                    onClick={() => removeImage(index)}
                  >
                    Quitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ImageUpload
          value=""
          appendMode
          label={formData.images.length ? 'Añadir otra imagen' : 'Subir imagen'}
          onChange={addImageUrl}
          error={errors.image}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          {product ? 'Actualizar' : 'Crear'} Producto
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
