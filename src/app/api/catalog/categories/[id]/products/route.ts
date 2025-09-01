import { NextRequest, NextResponse } from 'next/server';
import { catalogService } from '@/services/catalog-service';

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const categoryId = parseInt(params.id);
        
        if (isNaN(categoryId)) {
            return NextResponse.json(
                { error: 'ID da categoria inválido' },
                { status: 400 }
            );
        }
        
        const { searchParams } = new URL(request.url);
        const cursor = searchParams.get('cursor');
        const direction = searchParams.get('direction') as 'next' | 'prev' | undefined;
        const limit = parseInt(searchParams.get('limit') || '12');
        
        const pagination = {
            limit,
            direction: direction || 'next'
        };
        
        if (cursor) {
            pagination.cursor = parseInt(cursor);
        }
        
        const productsData = await catalogService.getProductsByCategory(categoryId, pagination);
        return NextResponse.json(productsData);
        
    } catch (error) {
        console.error('Erro ao buscar produtos da categoria:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
