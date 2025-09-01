import { NextRequest, NextResponse } from 'next/server';
import { catalogService } from '@/services/catalog-service';

export async function GET() {
    try {
        console.log('🔍 API: Buscando categorias...');
        const categories = await catalogService.getCategories();
        console.log('📊 API: Categorias encontradas:', categories);
        console.log('📊 API: Total de categorias:', categories.length);
        return NextResponse.json(categories);
    } catch (error) {
        console.error('❌ API: Erro ao buscar categorias:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
