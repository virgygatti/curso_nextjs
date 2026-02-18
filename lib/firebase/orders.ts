import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';
import type { Order } from '@/types';

const ORDERS_COLLECTION = 'orders';

export async function createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...order,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}
