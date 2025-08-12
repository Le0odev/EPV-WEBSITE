import mysql from 'mysql2/promise';
import 'dotenv/config';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: ProductCategory;
    imageUrl: string;
    imageHint: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    description: string | null;
}

// Mapeamento de categorias da UI para as categorias do "banco de dados"
const categoryUIMap: Record<string, string[]> = {
    "Cereais e Grãos": ["Cereais / Grãos", "Amendoins"],
    "Suplementos": ["Suplementos", "Barrinhas", "Pré-treino", "Creatina", "Vitaminas/Minerais", "Encapsulados"],
    "Chás e Infusões": ["Chás e infusões"],
    "Ervas e Temperos": ["Ervas e Temperos"],
    "Outros": ["Óleos / Diversos", "Energéticos"]
};

// Cache para as categorias para evitar buscas repetidas no DB
let categoriesCache: ProductCategory[] | null = null;

class ProductService {
    private db: mysql.Pool | null = null;

    private async getDbConnection() {
        if (this.db) {
            return this.db;
        }
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL não está definida no .env');
        }
        this.db = mysql.createPool(process.env.DATABASE_URL);
        return this.db;
    }

    async getAllCategories(): Promise<ProductCategory[]> {
        if (categoriesCache) {
            return categoriesCache;
        }

        const db = await this.getDbConnection();
        const [rows] = await db.query('SELECT id, name, description FROM categories');
        
        const categories = (rows as any[]).map(row => ({
            id: String(row.id),
            name: row.name,
            description: row.description
        }));
        
        categoriesCache = categories;
        return categories;
    }

    async getProductsByCategory(categoryUIName: string): Promise<Product[]> {
        console.log(`Buscando produtos para a categoria da UI: ${categoryUIName}`);

        const allCategories = await this.getAllCategories();
        
        const dbCategoryNames = categoryUIMap[categoryUIName];
        
        if (!dbCategoryNames || dbCategoryNames.length === 0) {
            console.warn(`Mapeamento da categoria da UI não encontrado: ${categoryUIName}`);
            return [];
        }

        console.log(`Categorias do DB correspondentes: ${dbCategoryNames.join(', ')}`);

        const categoryIds = allCategories
            .filter(c => dbCategoryNames.includes(c.name))
            .map(c => c.id);

        if (categoryIds.length === 0) {
            console.warn(`Nenhuma categoria do DB encontrada para os nomes: ${dbCategoryNames.join(', ')}`);
            return [];
        }

        const db = await this.getDbConnection();
        const query = `
            SELECT 
                p.id, p.name, p.description, p.price, p.stock, p.imageUrl, p.imageHint,
                c.id as categoryId, c.name as categoryName, c.description as categoryDescription
            FROM products p
            JOIN categories c ON p.categoryId = c.id
            WHERE p.categoryId IN (?)
        `;

        const [rows] = await db.query(query, [categoryIds]);

        const products = (rows as any[]).map(row => ({
            id: String(row.id),
            name: row.name,
            description: row.description,
            price: row.price,
            stock: row.stock,
            imageUrl: row.imageUrl || 'https://placehold.co/600x400.png',
            imageHint: row.imageHint || 'product image',
            category: {
                id: String(row.categoryId),
                name: row.categoryName,
                description: row.categoryDescription
            }
        }));
        
        console.log(`Encontrados ${products.length} produtos.`);
        return products;
    }
}

export const productService = new ProductService();
