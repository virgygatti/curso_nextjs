import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Producto Ejemplo 1',
    description: 'Descripción detallada del producto ejemplo 1',
    price: 299.99,
    image: '/images/product1.jpg',
    category: 'electronica',
    stock: 10,
    images: ['/images/product1.jpg', '/images/product1-2.jpg']
  },
  {
    id: '2',
    name: 'Producto Ejemplo 2',
    description: 'Descripción detallada del producto ejemplo 2',
    price: 149.99,
    image: '/images/product2.jpg',
    category: 'ropa',
    stock: 5,
    images: ['/images/product2.jpg']
  },
  {
    id: '3',
    name: 'Producto Ejemplo 3',
    description: 'Descripción detallada del producto ejemplo 3',
    price: 89.99,
    image: '/images/product3.jpg',
    category: 'hogar',
    stock: 15,
  },
  {
    id: '4',
    name: 'Producto Ejemplo 4',
    description: 'Descripción detallada del producto ejemplo 4',
    price: 199.99,
    image: '/images/product4.jpg',
    category: 'electronica',
    stock: 8,
  },
  {
    id: '5',
    name: 'Producto Ejemplo 5',
    description: 'Descripción detallada del producto ejemplo 5',
    price: 79.99,
    image: '/images/product5.jpg',
    category: 'ropa',
    stock: 20,
  },
];

export const categories = ['electronica', 'ropa', 'hogar'];
