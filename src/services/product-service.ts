
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
    description: string;
}

const categories: ProductCategory[] = [
    { id: '1', name: 'Grãos e Cereais', description: 'Grãos e cereais a granel' },
    { id: '2', name: 'Chás e infusões', description: 'Chás e infusões de ervas' },
    { id: '3', name: 'Ervas e Temperos', description: 'Ervas e temperos para culinária' },
    { id: '4', name: 'Suplementos', description: 'Suplementos alimentares e vitaminas' },
];

const products: Product[] = [
    { id: '101', name: 'Feijão Carioca Orgânico', description: '500g de feijão carioca orgânico, rico em fibras.', price: 8.50, stock: 150, category: categories[0], imageUrl: 'https://images.unsplash.com/photo-1574441432139-8a4ff373405c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmZWlqYW8lMjBjYXJpb2NhfGVufDB8fHx8MTc1NTI4NDkzNnww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'feijao carioca' },
    { id: '102', name: 'Arroz Integral Cateto', description: '1kg de arroz integral cateto, ideal para risotos.', price: 12.00, stock: 200, category: categories[0], imageUrl: 'https://images.unsplash.com/photo-1586201375822-a89a015383a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcnJveiUyMGludGVncmFsfGVufDB8fHx8MTc1NTI4NDk4MXww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'arroz integral' },
    { id: '103', name: 'Quinoa em Grãos', description: '250g de quinoa real, superalimento nutritivo.', price: 15.75, stock: 120, category: categories[0], imageUrl: 'https://images.unsplash.com/photo-1516853942322-a1b9a9134a66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxxdWlub2F8ZW58MHx8fHwxNzU1Mjg1MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'quinoa' },
    { id: '201', name: 'Chá de Camomila', description: 'Caixa com 20 sachês de chá de camomila orgânico.', price: 9.90, stock: 80, category: categories[1], imageUrl: 'https://images.unsplash.com/photo-1594229158557-402a5491a34a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjaGElMjBkZSUyMGNhbW9taWxhfGVufDB8fHx8MTc1NTI4NTAzNHww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'cha camomila' },
    { id: '202', name: 'Chá Verde Sencha', description: '50g de chá verde sencha a granel, importado.', price: 22.50, stock: 60, category: categories[1], imageUrl: 'https://images.unsplash.com/photo-1627435601361-ec25f2b7442a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjaGElMjB2ZXJkZXxlbnwwfHx8fDE3NTUyODUwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'cha verde' },
    { id: '301', name: 'Açafrão da Terra (Cúrcuma)', description: '50g de açafrão da terra em pó, 100% puro.', price: 7.20, stock: 180, category: categories[2], imageUrl: 'https://images.unsplash.com/photo-1629828022996-9cb663677334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhY2FmcmFvfGVufDB8fHx8MTc1NTI4NTA4OXww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'acafrao' },
    { id: '302', name: 'Páprica Defumada', description: '50g de páprica defumada, ideal para carnes e legumes.', price: 6.80, stock: 250, category: categories[2], imageUrl: 'https://images.unsplash.com/photo-1519622283944-350a41ead5a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYXByaWNhfGVufDB8fHx8MTc1NTI4NTEzMHww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'paprica' },
    { id: '401', name: 'Creatina Monohidratada', description: '300g de creatina monohidratada pura.', price: 89.90, stock: 50, category: categories[3], imageUrl: 'https://images.unsplash.com/photo-1683394305929-5e7c8d942127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxDcmVhdGluYXxlbnwwfHx8fDE3NTUwMjcwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'creatina' },
    { id: '402', name: 'Whey Protein Concentrado', description: '900g de whey protein sabor baunilha.', price: 159.90, stock: 40, category: categories[3], imageUrl: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3aGV5JTIwcHJvdGVpbnxlbnwwfHx8fDE3NTUyODUxODF8MA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'whey protein' },
];

class ProductService {
    async getProductsByCategory(categoryName: string): Promise<Product[]> {
        console.log(`Buscando produtos para a categoria: ${categoryName}`);
        
        const category = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
        
        if (!category) {
            console.warn(`Categoria não encontrada: ${categoryName}`);
            return [];
        }

        const filteredProducts = products.filter(p => p.category.id === category.id);
        console.log(`Encontrados ${filteredProducts.length} produtos.`);
        return filteredProducts;
    }

    async getAllCategories(): Promise<ProductCategory[]> {
        return categories;
    }
}

export const productService = new ProductService();
