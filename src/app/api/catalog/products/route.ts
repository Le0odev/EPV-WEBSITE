import { NextRequest, NextResponse } from 'next/server';
import { catalogService } from '@/services/catalog-service';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        
        // Extrair parâmetros da query
        const category_id = searchParams.get('category_id');
        const search = searchParams.get('search');
        const cursor = searchParams.get('cursor');
        const direction = searchParams.get('direction') as 'next' | 'prev' | undefined;
        const limit = parseInt(searchParams.get('limit') || '12');
        
        console.log('🔍 API: Buscando produtos...');
        console.log('🔍 API: Filtros:', { category_id, search, cursor, direction, limit });
        
        // Construir filtros
        const filters: any = {};
        if (category_id) filters.categoria_id = parseInt(category_id);
        if (search) filters.search = search;
        
        // Construir paginação
        const pagination: any = {
            limit,
            direction: direction || 'next'
        };
        
        if (cursor) {
            pagination.cursor = parseInt(cursor);
        }
        
        console.log('🔍 API: Filtros finais:', filters);
        console.log('🔍 API: Paginação:', pagination);
        
        const productsData = await catalogService.getProducts(filters, pagination);
        console.log('📊 API: Produtos encontrados:', productsData.products?.length || 0);
        console.log('📊 API: Total:', productsData.total);
        console.log('📊 API: HasMore:', productsData.hasMore);
        
        return NextResponse.json(productsData);
        
    } catch (error) {
        console.error('❌ API: Erro ao buscar produtos:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
