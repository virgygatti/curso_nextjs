'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push('/admin');
      router.refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Error al iniciar sesión';
      if (message.includes('auth/invalid-credential') || message.includes('auth/wrong-password')) {
        setError('Email o contraseña incorrectos.');
      } else if (message.includes('auth/user-not-found')) {
        setError('No existe una cuenta con este email.');
      } else {
        setError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-2 text-center">Iniciar sesión</h1>
      <p className="text-gray-600 text-center mb-8">
        Acceso al panel de administración
      </p>

      <form onSubmit={handleSubmit} className="form-card space-y-4 bg-white rounded-lg shadow-md p-6">
        {error && (
          <p className="text-red-600 text-sm" role="alert">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="input-form"
            />
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="input-form"
          />
        </div>
        <Button type="submit" className="w-full" loading={isSubmitting} disabled={isSubmitting}>
          Entrar
        </Button>
      </form>

      <p className="text-center mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          Volver al inicio
        </Link>
      </p>
    </div>
  );
}
