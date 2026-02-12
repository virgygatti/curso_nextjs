import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/firebase/products';

export const revalidate = 60;

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('GET /api/products/[id]:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al obtener producto' },
      { status: 500 }
    );
  }
}
