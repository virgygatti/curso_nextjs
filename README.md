# E-commerce - Next.js

Proyecto de e-commerce autoadministrable para Coderhouse (Next.js). Incluye catálogo con filtros por categoría, carrito, checkout, panel de administración protegido con Firebase (Auth, Firestore, Storage) y optimización SEO (metadata, Open Graph).

## Tecnologías

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Firebase** (Authentication, Firestore, Storage)

## Estructura principal

```
app/
  catalog/          # Catálogo con filtros por categoría
  product/[id]/    # Detalle de producto
  cart/             # Carrito
  checkout/         # Checkout y orden de compra
  admin/            # Panel admin (protegido)
  login/            # Inicio de sesión
lib/
  firebase/         # Config, productos, órdenes, storage
context/
  CartContext.tsx    # Estado del carrito
  AuthContext.tsx   # Autenticación
```

## Requisitos

- Node.js 18+
- Cuenta en [Firebase](https://console.firebase.google.com) y proyecto con Auth, Firestore y Storage habilitados

## Instalación local

1. Clonar el repositorio e instalar dependencias:

```bash
git clone <url-del-repo>
cd nextjs
npm install
```

2. Configurar variables de entorno. Crear un archivo `.env.local` en la raíz con:

```env
# Firebase (desde la consola de Firebase > Configuración del proyecto)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

3. En Firebase Console:

- **Authentication**: habilitar “Correo/Contraseña” y crear al menos un usuario para acceder a `/admin`.
- **Firestore**: crear la colección `products` (y `orders` se crea al hacer la primera compra). Copiar las reglas desde `firestore.rules`.
- **Storage**: copiar las reglas desde `storage.rules`.

4. Arrancar el servidor de desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando       | Descripción              |
|---------------|--------------------------|
| `npm run dev` | Servidor de desarrollo   |
| `npm run build` | Build para producción |
| `npm run start` | Servidor en modo producción |
| `npm run lint` | Ejecutar ESLint          |

## Reglas de Firebase

- **Firestore**: ver y copiar desde `firestore.rules` en la consola (Firestore → Reglas).
- **Storage**: ver y copiar desde `storage.rules` en la consola (Storage → Reglas).


## Link Vercel

[https://curso-nextjs-pied.vercel.app/](https://curso-nextjs-pied.vercel.app/)
