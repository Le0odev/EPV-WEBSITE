import mysql from 'mysql2/promise';

export interface Product {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    imagem: string;
    categoria_id: number;
    estoque: number;
    estoque_peso?: number;
    is_bulk: boolean;
}

export interface Category {
    id: number;
    nome: string;
    descricao?: string;
    product_count: number;
}

export interface PaginationCursor {
    cursor?: number;
    limit: number;
    direction: 'next' | 'prev';
}

export interface PaginatedProducts {
    products: Product[];
    nextCursor?: number;
    prevCursor?: number;
    hasMore: boolean;
    total: number;
}

export interface CatalogFilters {
    categoria_id?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    onlyAvailable?: boolean;
}

class CatalogService {
    private pool: mysql.Pool;

    constructor() {
        console.log('🔧 DB: Configurando conexão com variáveis:', {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            hasPassword: !!process.env.DB_PASSWORD
        });

        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            // Configurações de timeout
            connectTimeout: 60000, // 60 segundos para conectar
        });
    }

    async getCategories(): Promise<Category[]> {
        const maxRetries = 3;
        let lastError: any;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`🔍 DB: Tentativa ${attempt}/${maxRetries} - Conectando ao banco para buscar categorias...`);
                console.log('🔍 DB: Variáveis de ambiente:', {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    database: process.env.DB_NAME,
                    hasPassword: !!process.env.DB_PASSWORD
                });
                
                const query = `
                    SELECT c.id, c.category_name as nome, c.cat_description as descricao, COUNT(p.id) as product_count
                    FROM categoria c
                    LEFT JOIN produto p ON c.id = p.category_id AND (p.estoque_quant > 0 OR p.estoque_peso > 0)
                    GROUP BY c.id, c.category_name, c.cat_description
                    ORDER BY product_count DESC, c.category_name
                `;
                console.log('🔍 DB: Executando query:', query);
                
                const [rows] = await this.pool.execute(query);
                console.log('🔍 DB: Resultado bruto:', rows);
                
                const result = rows as Category[];
                console.log('🔍 DB: Categorias processadas:', result);
                console.log('🔍 DB: Total de categorias:', result.length);
                
                return result;
            } catch (error) {
                lastError = error;
                console.error(`❌ DB: Tentativa ${attempt}/${maxRetries} falhou:`, error);
                
                if (attempt < maxRetries) {
                    console.log(`⏳ DB: Aguardando 2 segundos antes da próxima tentativa...`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        }
        
        console.error('❌ DB: Todas as tentativas falharam. Último erro:', lastError);
        return [];
    }

    async getProducts(
        filters: CatalogFilters = {},
        pagination: PaginationCursor = { limit: 12, direction: 'next' }
    ): Promise<PaginatedProducts> {
        try {
            console.log('🔍 DB: Buscando produtos...');
            console.log('🔍 DB: Filtros recebidos:', filters);
            console.log('🔍 DB: Paginação recebida:', pagination);
            
            let whereClause = 'WHERE (estoque_quant > 0 OR estoque_peso > 0)';
            const params: any[] = [];

            // Filtros
            if (filters.categoria_id) {
                whereClause += ' AND category_id = ?';
                params.push(filters.categoria_id);
            }

            if (filters.search) {
                whereClause += ' AND (product_name LIKE ? OR product_description LIKE ?)';
                const searchTerm = `%${filters.search}%`;
                params.push(searchTerm, searchTerm);
            }

            if (filters.minPrice !== undefined) {
                whereClause += ' AND product_price >= ?';
                params.push(filters.minPrice);
            }

            if (filters.maxPrice !== undefined) {
                whereClause += ' AND product_price <= ?';
                params.push(filters.maxPrice);
            }

            // Paginação cursor-based
            let orderClause = 'ORDER BY id';
            if (pagination.cursor && pagination.direction === 'prev') {
                orderClause = 'ORDER BY id DESC';
                whereClause += ' AND id < ?';
                params.push(pagination.cursor);
            } else if (pagination.cursor && pagination.direction === 'next') {
                whereClause += ' AND id > ?';
                params.push(pagination.cursor);
            }

            // Query principal - Simplificada para teste
            const query = `
                SELECT id, product_name as nome, product_price as preco, product_description as descricao, image_url as imagem, category_id as categoria_id, estoque_quant as estoque, estoque_peso, is_bulk
                FROM produto 
                ${whereClause}
                ${orderClause}
                LIMIT ?
            `;

            // Criar uma cópia dos parâmetros para não afetar a query de contagem
            const queryParams = [...params, pagination.limit + 1];



            const [rows] = await this.pool.query(query, queryParams);
            const products = rows as Product[];

            // Verificar se há mais páginas
            const hasMore = products.length > pagination.limit;
            const actualProducts = hasMore ? products.slice(0, pagination.limit) : products;

            // Cursors para paginação
            let nextCursor: number | undefined;
            let prevCursor: number | undefined;

            if (actualProducts.length > 0) {
                if (pagination.direction === 'next') {
                    nextCursor = actualProducts[actualProducts.length - 1].id;
                } else {
                    prevCursor = actualProducts[0].id;
                }
            }

            // Contar total de produtos (para filtros)
            const [countRows] = await this.pool.query(
                `SELECT COUNT(*) as total FROM produto ${whereClause}`,
                params // Usar apenas os parâmetros dos filtros, sem o LIMIT
            );
            const total = (countRows as any)[0].total;

            return {
                products: actualProducts,
                nextCursor,
                prevCursor,
                hasMore,
                total
            };
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return {
                products: [],
                hasMore: false,
                total: 0
            };
        }
    }

    async getProductById(id: number): Promise<Product | null> {
        try {
            const [rows] = await this.pool.query(`
                SELECT 
                    id,
                    product_name as nome,
                    product_price as preco,
                    product_description as descricao,
                    image_url as imagem,
                    category_id as categoria_id,
                    estoque_quant as estoque,
                    estoque_peso,
                    is_bulk
                FROM produto 
                WHERE id = ? AND (estoque_quant > 0 OR estoque_peso > 0)
            `, [id]);

            const products = rows as Product[];
            if (products.length === 0) return null;
            
            // Converter Buffer is_bulk para boolean
            const product = products[0];
            const processedProduct = {
                ...product,
                is_bulk: product.is_bulk && typeof product.is_bulk === 'object' && 'data' in product.is_bulk 
                    ? (product.is_bulk as any).data[0] === 1 
                    : Boolean(product.is_bulk)
            };
            
            return processedProduct;
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return null;
        }
    }

    async getProductsByCategory(categoryId: number, pagination: PaginationCursor = { limit: 12, direction: 'next' }): Promise<PaginatedProducts> {
        return this.getProducts({ categoria_id: categoryId }, pagination);
    }

    async searchProducts(searchTerm: string, pagination: PaginationCursor = { limit: 12, direction: 'next' }): Promise<PaginatedProducts> {
        return this.getProducts({ search: searchTerm }, pagination);
    }

    async getTotalProducts(filters: CatalogFilters = {}): Promise<number> {
        try {
            let whereClause = 'WHERE (estoque_quant > 0 OR estoque_peso > 0)';
            const params: any[] = [];

            if (filters.categoria_id) {
                whereClause += ' AND category_id = ?';
                params.push(filters.categoria_id);
            }

            if (filters.search) {
                whereClause += ' AND (product_name LIKE ? OR product_description LIKE ?)';
                const searchTerm = `%${filters.search}%`;
                params.push(searchTerm, searchTerm);
            }

            const [rows] = await this.pool.query(
                `SELECT COUNT(*) as total FROM produto ${whereClause}`,
                params
            );

            return (rows as any)[0].total;
        } catch (error) {
            console.error('Erro ao contar produtos:', error);
            return 0;
        }
    }

    async getProductCountsByCategory(): Promise<Record<number, number>> {
        try {
            const [rows] = await this.pool.query(`
                SELECT category_id, COUNT(*) as total 
                FROM produto 
                WHERE (estoque_quant > 0 OR estoque_peso > 0)
                GROUP BY category_id
            `);
            
            const counts: Record<number, number> = {};
            (rows as any[]).forEach((row: any) => {
                counts[row.category_id] = row.total;
            });
            
            return counts;
        } catch (error) {
            console.error('Erro ao contar produtos por categoria:', error);
            return {};
        }
    }


}

export const catalogService = new CatalogService();
