import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore';
import { db } from './config';
import type { Product } from '@/types';

const PRODUCTS_COLLECTION = 'products';

function mapDocToProduct(id: string, data: DocumentData): Product {
  return {
    id,
    name: data.name ?? '',
    description: data.description ?? '',
    price: Number(data.price) ?? 0,
    image: data.image ?? '',
    category: data.category ?? '',
    stock: Number(data.stock) ?? 0,
    images: data.images ? (Array.isArray(data.images) ? data.images : []) : undefined,
  };
}

/**
 * Obtener todos los productos desde Firestore.
 */
export async function getProducts(): Promise<Product[]> {
  const snapshot: QuerySnapshot = await getDocs(
    query(collection(db, PRODUCTS_COLLECTION), orderBy('name'))
  );
  return snapshot.docs.map((d) => mapDocToProduct(d.id, d.data()));
}

/**
 * Obtener un producto por ID.
 */
export async function getProductById(id: string): Promise<Product | null> {
  const ref = doc(db, PRODUCTS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return mapDocToProduct(snap.id, snap.data());
}

/**
 * Obtener productos por categoría.
 * Filtra en memoria para no requerir índice compuesto en Firestore.
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === category);
}

/**
 * Obtener lista de categorías únicas desde los productos.
 * No hace falta una colección aparte en Firebase.
 */
export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  const set = new Set(products.map((p) => p.category).filter(Boolean));
  return Array.from(set).sort();
}
