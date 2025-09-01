import { Product, Category, PaginationCursor, CatalogFilters, PaginatedProducts } from './catalog-service';

class CatalogApiService {
    private baseUrl = '/api/catalog';

    async getCategories(): Promise<Category[]> {
        const response = await fetch(`${this.baseUrl}/categories`);
        if (!response.ok) {
            throw new Error('Erro ao buscar categorias');
        }
        return response.json();
    }

    async getProducts(filters?: CatalogFilters, pagination?: PaginationCursor): Promise<PaginatedProducts> {
        const params = new URLSearchParams();
        
        if (filters?.categoria_id) {
            params.append('category_id', filters.categoria_id.toString());
        }
        
        if (filters?.search) {
            params.append('search', filters.search);
        }
        
        if (pagination?.cursor) {
            params.append('cursor', pagination.cursor.toString());
        }
        
        if (pagination?.direction) {
            params.append('direction', pagination.direction);
        }
        
        if (pagination?.limit) {
            params.append('limit', pagination.limit.toString());
        }
        
        const url = `${this.baseUrl}/products${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        
        return response.json();
    }

    async getProductById(id: number): Promise<Product | null> {
        const response = await fetch(`${this.baseUrl}/products/${id}`);
        
        if (response.status === 404) {
            return null;
        }
        
        if (!response.ok) {
            throw new Error('Erro ao buscar produto');
        }
        
        return response.json();
    }

    async getProductsByCategory(categoryId: number, pagination?: PaginationCursor): Promise<PaginatedProducts> {
        const params = new URLSearchParams();
        
        if (pagination?.cursor) {
            params.append('cursor', pagination.cursor.toString());
        }
        
        if (pagination?.direction) {
            params.append('direction', pagination.direction);
        }
        
        if (pagination?.limit) {
            params.append('limit', pagination.limit.toString());
        }
        
        const url = `${this.baseUrl}/categories/${categoryId}/products${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos da categoria');
        }
        
        return response.json();
    }

    async searchProducts(searchTerm: string): Promise<Product[]> {
        const response = await fetch(`${this.baseUrl}/products?search=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        
        const data = await response.json();
        return data.products || [];
    }

    async getTotalProducts(filters?: CatalogFilters): Promise<number> {
        const params = new URLSearchParams();
        
        if (filters?.categoria_id) {
            params.append('category_id', filters.categoria_id.toString());
        }
        
        if (filters?.search) {
            params.append('search', filters.search);
        }
        
        const url = `${this.baseUrl}/products?${params.toString()}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar total de produtos');
        }
        
        const data = await response.json();
        return data.total || 0;
    }

    async getProductCountsByCategory(): Promise<Record<number, number>> {
        try {
            // Fazer uma única chamada para buscar todas as categorias com contadores
            const categories = await this.getCategories();
            const counts: Record<number, number> = {};
            
            // Para cada categoria, buscar o total de produtos
            for (const category of categories) {
                const total = await this.getTotalProducts({ categoria_id: category.id });
                counts[category.id] = total;
            }
            
            return counts;
        } catch (error) {
            console.error('Erro ao contar produtos por categoria:', error);
            return {};
        }
    }
}

export const catalogApiService = new CatalogApiService();
