export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  images?: string[]; // Para el slider de imágenes
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}
