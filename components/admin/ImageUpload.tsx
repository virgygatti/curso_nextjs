'use client';

import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { uploadProductImage } from '@/lib/firebase/storage';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

const ACCEPT = 'image/jpeg,image/png,image/webp';

export default function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      onChange(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Error al subir la imagen');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <label className="form-label">Imagen del producto</label>
      <div className="flex flex-wrap gap-2 items-center">
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          onChange={handleFile}
          className="hidden"
        />
        <Button
          type="button"
          variant="secondary"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <>
              <Spinner size="sm" />
              Subiendo...
            </>
          ) : (
            'Subir imagen'
          )}
        </Button>
        {value && (
          <span className="text-gray-500 text-sm">Imagen cargada</span>
        )}
      </div>
      {(error || uploadError) && (
        <p className="text-red-500 text-sm mt-1">{error || uploadError}</p>
      )}
    </div>
  );
}
