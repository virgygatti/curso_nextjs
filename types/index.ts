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

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: string;
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  createdAt?: string;
}
