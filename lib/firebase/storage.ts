import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

const PRODUCTS_FOLDER = 'products';

/**
 * Sube un archivo de imagen a Firebase Storage y devuelve la URL pública.
 */
export async function uploadProductImage(file: File): Promise<string> {
  const name = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
  const storageRef = ref(storage, `${PRODUCTS_FOLDER}/${name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
