import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CategoryProducts } from '@/components/catalog/category-products';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 1800; // Revalidar a cada 30 minutos

interface CategoryPageProps {
    params: {
        id: string;
    };
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const categoryId = parseInt(params.id);
    
    if (isNaN(categoryId)) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <Suspense fallback={<CategorySkeleton />}>
                    <CategoryProducts categoryId={categoryId} />
                </Suspense>
            </div>
        </div>
    );
}

function CategorySkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>
            
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
    );
}
