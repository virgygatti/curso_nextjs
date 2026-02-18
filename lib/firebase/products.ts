import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  increment,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore';
import { db } from './config';
import type { Product, ProductFormData } from '@/types';

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

function productFormToFirestore(data: ProductFormData): DocumentData {
  return {
    name: data.name,
    description: data.description,
    price: data.price,
    image: data.image,
    category: data.category,
    stock: data.stock,
  };
}

/**
 * Crear un nuevo producto en Firestore.
 */
export async function createProduct(data: ProductFormData): Promise<Product> {
  const ref = await addDoc(collection(db, PRODUCTS_COLLECTION), productFormToFirestore(data));
  const created = await getProductById(ref.id);
  if (!created) throw new Error('Error al crear el producto');
  return created;
}

/**
 * Actualizar un producto existente.
 */
export async function updateProduct(id: string, data: ProductFormData): Promise<void> {
  const ref = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(ref, productFormToFirestore(data));
}

/**
 * Eliminar un producto.
 */
export async function deleteProduct(id: string): Promise<void> {
  const ref = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(ref);
}

/**
 * Decrementar stock de un producto (para órdenes).
 */
export async function decrementStock(productId: string, quantity: number): Promise<void> {
  const ref = doc(db, PRODUCTS_COLLECTION, productId);
  await updateDoc(ref, { stock: increment(-quantity) });
}
