import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProductsByCategory } from '@/lib/firebase/products';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const products = category
      ? await getProductsByCategory(category)
      : await getProducts();

    return NextResponse.json(products);
  } catch (error) {
    console.error('GET /api/products:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al obtener productos' },
      { status: 500 }
    );
  }
}
