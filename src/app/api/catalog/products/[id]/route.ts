import { NextRequest, NextResponse } from 'next/server';
import { catalogService } from '@/services/catalog-service';

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const productId = parseInt(params.id);
        
        if (isNaN(productId)) {
            return NextResponse.json(
                { error: 'ID do produto inválido' },
                { status: 400 }
            );
        }
        
        const product = await catalogService.getProductById(productId);
        
        if (!product) {
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(product);
        
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
