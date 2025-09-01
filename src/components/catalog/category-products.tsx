'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, Category, PaginationCursor } from '@/services/catalog-service';
import { catalogApiService } from '@/services/catalog-api';
import { ProductCard } from './product-card';
import { Pagination } from './pagination';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Filter, X } from 'lucide-react';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/use-media-query';

interface CategoryProductsProps {
    categoryId: number;
}

export function CategoryProducts({ categoryId }: CategoryProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationCursor>({
        limit: 12,
        direction: 'next'
    });
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [total, setTotal] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const isMobile = useMediaQuery("(max-width: 1024px)");

    // Carregar dados reais do banco
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                
                // Buscar categoria
                const categoriesData = await catalogApiService.getCategories();
                const currentCategory = categoriesData.find(c => c.id === categoryId);
                
                if (!currentCategory) {
                    setIsLoading(false);
                    return;
                }
                
                setCategory(currentCategory);
                
                // Buscar produtos da categoria
                const productsData = await catalogApiService.getProductsByCategory(categoryId);
                setProducts(productsData.products);
                setTotal(productsData.total);
                setHasNextPage(productsData.hasMore);
                setHasPrevPage(false);
                
            } catch (error) {
                console.error('Erro ao carregar dados da categoria:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadData();
    }, [categoryId]);

    const handleNextPage = useCallback(async () => {
        if (products.length > 0) {
            const lastProduct = products[products.length - 1];
            const newPagination = {
                ...pagination,
                cursor: lastProduct.id,
                direction: 'next' as const
            };
            setPagination(newPagination);
            
            try {
                setIsLoading(true);
                const productsData = await catalogApiService.getProductsByCategory(categoryId, newPagination);
                setProducts(productsData.products);
                setHasNextPage(productsData.hasMore);
                setHasPrevPage(true);
            } catch (error) {
                console.error('Erro ao carregar próxima página:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [products, pagination, categoryId]);

    const handlePrevPage = useCallback(async () => {
        if (products.length > 0) {
            const firstProduct = products[0];
            const newPagination = {
                ...pagination,
                cursor: firstProduct.id,
                direction: 'prev' as const
            };
            setPagination(newPagination);
            
            try {
                setIsLoading(true);
                const productsData = await catalogApiService.getProductsByCategory(categoryId, newPagination);
                setProducts(productsData.products);
                setHasNextPage(true);
                setHasPrevPage(productsData.hasMore);
            } catch (error) {
                console.error('Erro ao carregar página anterior:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [products, pagination, categoryId]);

    if (!category) {
        return (
            <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-4">
                    Categoria não encontrada
                </div>
                <Link href="/catalogo">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar ao Catálogo
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/catalogo" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-2">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar ao Catálogo
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight">{category.category_name}</h1>
                    <p className="text-muted-foreground text-lg mt-2">
                        {total} produto{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Mobile Filter Button */}
                <div className="lg:hidden">
                    <Button
                        variant="outline"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex items-center gap-2"
                    >
                        <Filter className="h-4 w-4" />
                        Filtros
                    </Button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
                    <div className="fixed right-0 top-0 h-full w-80 bg-background p-6 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Filtros</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Filtros específicos para {category.category_name} serão implementados aqui.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <div className="aspect-square bg-muted animate-pulse rounded-lg" />
                            <div className="space-y-2">
                                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                                <div className="h-3 bg-muted animate-pulse rounded w-full" />
                                <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : products.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    <Pagination
                        hasNextPage={hasNextPage}
                        hasPrevPage={hasPrevPage}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                        total={total}
                        currentCount={products.length}
                        isLoading={isLoading}
                    />
                </>
            ) : (
                <div className="text-center py-12">
                    <div className="text-muted-foreground text-lg mb-4">
                        Nenhum produto encontrado nesta categoria
                    </div>
                    <Link href="/catalogo">
                        <Button variant="outline">
                            Ver Todas as Categorias
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
