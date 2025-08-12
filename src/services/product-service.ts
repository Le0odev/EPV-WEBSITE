
export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: ProductCategory;
    imageUrl: string;
    imageHint: string;
}

export interface ProductCategory {
    id: string;
    name: string;
}

// Classe de serviço vazia para evitar erros de importação.
class ProductService {
    async getProductsByCategory(categoryUIName: string): Promise<Product[]> {
        console.log(`A busca por produtos na categoria '${categoryUIName}' foi removida.`);
        return [];
    }
}

export const productService = new ProductService();
