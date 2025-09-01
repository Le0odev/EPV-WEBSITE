import { Suspense } from 'react';
import { CatalogContent } from '@/components/catalog/catalog-content';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 3600; // Revalidar a cada 1 hora

export default function CatalogPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header apenas no desktop */}
                <div className="hidden lg:block mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Catálogo de Produtos</h1>
                    <p className="text-muted-foreground text-lg">
                        Descubra nossa seleção de produtos naturais de qualidade
                    </p>
                </div>
                
                <Suspense fallback={<CatalogSkeleton />}>
                    <CatalogContent />
                </Suspense>
            </div>
        </div>
    );
}

function CatalogSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
                <div className="space-y-4">
                    <Skeleton className="h-8 w-32" />
                    <div className="space-y-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="lg:col-span-3">
                <div className="space-y-6">
                    <Skeleton className="h-12 w-full max-w-md" />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="aspect-square w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-8 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
